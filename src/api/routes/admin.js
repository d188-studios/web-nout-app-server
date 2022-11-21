require("dotenv").config();
const express = require("express");
const { verifyAdmin, verifyToken } = require("../middlewares");
const db = require("../../models/index");
const {
  authService,
  usersService,
  encuestaService,
  pagesService,
} = require("../../services");

const {
  randomName,
  randomLastName,
  probabilityOf,
  randomProfesion,
  randomPageNumber,
  randomScore,
  formatArray,
  formatArrString,
} = require("../../utils");

const router = express.Router();

module.exports = function admin(app) {
  app.use("/admin", verifyToken, verifyAdmin, router);
  router.post("/users", async (req, res) => {
    try {
      const limit = req.body.limit ?? 10;
      const page = req.body.page ?? 1;
      const baneado = req.body.baneado;
      const verificado = req.body.verificado;
      const contestada = req.body.contestada;

      const usernames =
        req.body.usernames instanceof Array ? req.body.usernames : [];

      const email = req.body.email instanceof Array ? req.body.email : [];

      const allUsers = await db.sequelize.query(
        `select * from filter_username_email_ban(${
          usernames.length ? "'" + JSON.stringify(usernames) + "'" : "null"
        },
      ${email.length ? "'" + JSON.stringify(email) + "'" : "null"},
      ${baneado !== undefined ? baneado : null},
      ${verificado !== undefined ? verificado : null},
      ${contestada !== undefined ? contestada : null}
      )`,
        {
          plain: false,

          raw: false,

          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      const offset = (page - 1) * limit;

      const users = allUsers.filter((e) => !e.administrador);

      res.json({
        users: users.slice(offset, page * limit),
        count: users.length,
        limit,
        page,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.post("/populatedb", async (req, res) => {
    try {
      const numberOfUsers = req.body.users;
      for (let i = 0; i < numberOfUsers; i++) {
        const name = randomName().toLowerCase();
        const lastName = randomLastName().toLowerCase();
        const username = `${name}_${lastName}${i}`.toLowerCase();
        const email = `${username}@test.com`;
        const newUser = await authService.signUp(
          username,
          email,
          name,
          lastName,
          "123456"
        );
        const id = newUser.uuid;

        if (probabilityOf(80)) {
          await usersService.authorizeUser(id);
        }

        if (probabilityOf(80)) {
          await encuestaService.submitSurvey(
            id,
            randomScore(),
            randomScore(),
            randomScore(),
            randomProfesion()
          );
        }

        for (let j = 0; j < randomPageNumber(); j++) {
          await pagesService.createPage(id, `Page${j}`, null);
        }
      }

      return res.sendStatus(200);
    } catch (e) {
      res.sendStatus(400);
      console.log(e);
    }
  });

  router.post("/view/paginas_usuarios_verificados", async (req, res) => {
    try {
      const limit = req.body.limit ?? 10;
      const page = req.body.page ?? 1;

      const users = await db.sequelize.query(
        "select * from paginas_usuarios_verificados",
        {
          plain: false,

          raw: false,

          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      const offset = (page - 1) * limit;

      res.json({
        users: users.slice(offset, page * limit),
        count: users.length,
        limit,
        page,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });
  router.post(
    "/view/calificaciones_usuarios_sin_verificar",
    async (req, res) => {
      try {
        const limit = req.body.limit ?? 10;
        const page = req.body.page ?? 1;

        const users = await db.sequelize.query(
          "select * from califiaciones_usuarios_sin_verificar",
          {
            plain: false,

            raw: false,

            type: db.sequelize.QueryTypes.SELECT,
          }
        );

        const offset = (page - 1) * limit;

        res.json({
          users: users.slice(offset, page * limit),
          count: users.length,
          limit,
          page,
        });
      } catch (e) {
        console.log(e);
        res.sendStatus(400);
      }
    }
  );
  router.post("/view/baneados", async (req, res) => {
    try {
      const limit = req.body.limit ?? 10;
      const page = req.body.page ?? 1;

      const users = await db.sequelize.query(
        "select * from valor_encuesta_verificado_usuarios_baneados",
        {
          plain: false,

          raw: false,

          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      const offset = (page - 1) * limit;

      res.json({
        users: users.slice(offset, page * limit),
        count: users.length,
        limit,
        page,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.post("/promedio", async (req, res) => {
    try {
      const scores = req.body;
      const users = await db.sequelize.query(
        `SELECT calcular_promedio('${formatArray(scores)}'::float[]);`,
        {
          plain: false,

          raw: false,

          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      res.json(users[0].calcular_promedio);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.post("/ban", async (req, res) => {
    try {
      const ids = req.body;
      const users = await db.sequelize.query(
        `select * from public.banear_usuarios('${formatArrString(ids)}');`,
        {
          plain: false,

          raw: false,

          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      res.json(users);
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.post("/movimientos_usuario", async (req, res) => {
    try {
      const limit = req.body.limit ?? 10;
      const page = req.body.page ?? 1;

      const usernames =
        req.body.usernames instanceof Array ? req.body.usernames : [];

      const movimiento =
        req.body.movimiento instanceof Array ? req.body.movimiento : [];

      const users = await db.sequelize.query(
        `select * from filter_movimientos_usuario(${
          usernames.length ? "'" + JSON.stringify(usernames) + "'" : "null"
        },
        ${movimiento.length ? "'" + JSON.stringify(movimiento) + "'" : "null"}
        )`,
        {
          plain: false,

          raw: false,

          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      const offset = (page - 1) * limit;

      res.json({
        users: users.slice(offset, page * limit),
        count: users.length,
        limit,
        page,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });

  router.post("/movimientos_pagina", async (req, res) => {
    try {
      const limit = req.body.limit ?? 10;
      const page = req.body.page ?? 1;

      const usernames =
        req.body.usernames instanceof Array ? req.body.usernames : [];

      const movimiento =
        req.body.movimiento instanceof Array ? req.body.movimiento : [];

      const users = await db.sequelize.query(
        `select * from filter_movimientos_pagina(${
          usernames.length ? "'" + JSON.stringify(usernames) + "'" : "null"
        },
          ${movimiento.length ? "'" + JSON.stringify(movimiento) + "'" : "null"}
          )`,
        {
          plain: false,

          raw: false,

          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      const offset = (page - 1) * limit;

      res.json({
        users: users.slice(offset, page * limit),
        count: users.length,
        limit,
        page,
      });
    } catch (e) {
      console.log(e);
      res.sendStatus(400);
    }
  });
};
