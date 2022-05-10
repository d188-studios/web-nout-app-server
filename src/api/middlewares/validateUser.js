const { body } = require("express-validator");
const validationErrors = require("./validationErrors");

module.exports = [
  body("username")
    .isLength({ max: 32 })
    .withMessage("Username must be less than 32 characters")
    .custom((value) => {
      if (/^[a-z_\d]+$/.test(value)) return true;
      throw new Error("Username must be lowercase alphanumeric");
    }),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  validationErrors,
];
