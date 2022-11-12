const { body } = require("express-validator");
const validationErrors = require("./validationErrors");
const { Encuesta } = require("../../models");

module.exports = [
  body("visualScore")
    .isLength({ min: 1 })
    .withMessage("The visual Score can't be empty")
    .custom(async (value) => {
      if (typeof value !== "number")
        throw new Error("The visual Score needs to be a number");

      if (value < 0) return new Error("scores can't be negative");

      if (value > 5) return new Error("Scores can't be bigger than five");

      return true;
    }),
  body("UXscore")
    .isLength({ min: 1 })
    .withMessage("The user experience score can't be empty")
    .custom(async (value) => {
      if (typeof value !== "number")
        throw new Error("The user experience score needs to be a number");

      if (value < 0) throw new Error("scores can't be negative");

      if (value > 5) throw new Error("Scores can't be bigger than five");

      console.log(value);
      return true;
    }),
  body("utilityScore")
    .isLength({ min: 1 })
    .withMessage("The utility score can't be empty")
    .custom(async (value) => {
      if (typeof value !== "number")
        throw new Error("The utility score needs to be a number");

      if (value < 0) return new Error("scores can't be negative");

      if (value > 5) return new Error("Scores can't be bigger than five");

      return true;
    }),
  body("profesion")
    .isLength({ min: 1 })
    .withMessage("Profesion can't be empty")
    .isString()
    .withMessage("'Profesion' needs to be a string")
    .isIn(["Maestro", "Alumno", "Otro"])
    .withMessage("Profesion value must be one of [Maestro, Alumno, Otro]"),
  validationErrors,
];
