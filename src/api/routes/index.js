const express = require("express");
const status = require("./status");
const auth = require("./auth");
const pages = require("./pages");
const content = require("./content");

const router = express.Router();

module.exports = function routes(app) {
  app.use("/api", router);

  status(router);
  auth(router);
  pages(router);
  content(router);
};
