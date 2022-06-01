const validationErrors = require("./validationErrors");
const { body } = require("express-validator");

module.exports = [
  body("content").isLength({ min: 0 }).withMessage("Content can't be empty"),

  body("content").isArray().withMessage("Content must be an array"),
  validationErrors,
];
