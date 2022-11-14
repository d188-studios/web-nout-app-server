require("dotenv").config();
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
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
} = require("../../utils");

const router = express.Router();

module.exports = function admin(app) {
  app.use("/admin", router);
  router.post("/users", verifyToken, async (req, res) => {
    const limit = req.body.limit ?? 10;
    const page = req.body.page ?? 1;
    const baneado = req.body.baneado;

    const usernames =
      req.body.usernames instanceof Array ? req.body.usernames : [];

    const users = await db.sequelize.query(
      `select * from fu2(${
        usernames.length ? "'" + JSON.stringify(usernames) + "'" : "null"
      },
      null,
      ${baneado !== undefined ? baneado : null}
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
  });

  router.post("/populatedb", verifyToken, async (req, res) => {
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

  router.post(
    "/view/paginas_usuarios_verificados",
    verifyToken,
    async (req, res) => {
      try {
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
      const limit = req.body.limit ?? 10;
    }
  );
  router.post(
    "/view/calificaciones_usuarios_sin_verificar",
    verifyToken,
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
};
