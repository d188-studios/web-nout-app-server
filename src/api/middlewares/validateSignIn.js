const validationErrors = require("./validationErrors");
const { body } = require("express-validator");

module.exports = [
  body("username").isLength({ min: 1 }).withMessage("Username can't be empty"),
  body("password").isLength({ min: 1 }).withMessage("Password can't be empty"),
  validationErrors,
];
