const express = require("express");

const router = express.Router();

module.exports = function status(app) {
  app.use("/status", router);

  router.get("/", (_, res) => {
    res.sendStatus(200);
  });
};
