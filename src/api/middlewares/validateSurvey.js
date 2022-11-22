const { body } = require("express-validator");
const validationErrors = require("./validationErrors");

module.exports = [
  body("visualScore")
    .isLength({ min: 1 })
    .withMessage("The visual Score can't be empty")
    .custom((value) => {
      if (typeof value !== "number") return false;

      return true;
    })
    .withMessage("The visual Score needs to be a number")
    .custom((value) => {
      if (value < 0) return false;

      return true;
    })
    .withMessage("Scores can't be negative")
    .custom((value) => {
      if (value > 5) return false;

      return true;
    })
    .withMessage("Scores can't be bigger than five"),
  body("UXscore")
    .isLength({ min: 1 })
    .withMessage("The user experience score can't be empty")
    .custom((value) => {
      if (typeof value !== "number") return false;

      return true;
    })
    .withMessage("The user experience score needs to be a number")
    .custom((value) => {
      if (value < 0) return false;

      return true;
    })
    .withMessage("Scores can't be negative")
    .custom((value) => {
      if (value > 5) return false;

      return true;
    })
    .withMessage("Scores can't be bigger than five"),
  body("utilityScore")
    .isLength({ min: 1 })
    .withMessage("The utility score can't be empty")
    .custom((value) => {
      if (typeof value !== "number") return false;

      return true;
    })
    .withMessage("The utility score needs to be a number")
    .custom((value) => {
      if (value < 0) return false;

      return true;
    })
    .withMessage("Scores can't be negative")
    .custom((value) => {
      if (value > 5) return false;

      return true;
    })
    .withMessage("Scores can't be bigger than five"),
  body("profesion")
    .isLength({ min: 1 })
    .withMessage("Profesion can't be empty")
    .isString()
    .withMessage("'Profesion' needs to be a string")
    .isIn(["Maestro", "Alumno", "Otro"])
    .withMessage("Profesion value must be one of [Maestro, Alumno, Otro]"),
  validationErrors,
];
