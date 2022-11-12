require("dotenv").config();
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const db = require("../../models/index");
const { User } = require("../../models");

const router = express.Router();

module.exports = function admin(app) {
  app.use("/admin", router);
  router.post("/", verifyToken, async (req, res) => {
    // for (let i = 0; i < 1000; ++i) {
    //   await User.create({
    //     username: `user${i + 1}`,
    //     email: `user${i + 1}@test.com`,
    //     password: "password",
    //   });
    // }

    const limit = req.body.limit ?? 10;
    const page = req.body.page ?? 1;

    const usernames =
      req.body.usernames instanceof Array ? req.body.usernames : [];

    const users = await db.sequelize.query(
      // `select * from fu2('["emma"]', '["emma.lopez.ojeda@gmail.com", "shttyampguy@gmail.com"]')`,
      `select * from fu2(${
        usernames.length ? "'" + JSON.stringify(usernames) + "'" : "null"
      }, null)`,
      {
        logging: console.log,
        plain: false,

        raw: false,

        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    console.log(users);

    const i = (page - 1) * limit;

    res.json({
      users: users.slice(i, page * limit),
      count: users.length,
    });
  });

  router.post("/", verifyToken, async (req, res) => {});
};
