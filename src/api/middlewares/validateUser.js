const { body } = require("express-validator");
const validationErrors = require("./validationErrors");
const { User } = require("../../models");

module.exports = [
  body("username")
    .isLength({ max: 32 })
    .withMessage("El nombre de usuario debe tener un máximo de 32 caracteres.")
    .custom(async (value) => {
      if (!/^[a-zA-Z_\d]+$/.test(value))
        throw new Error(
          "El nombre de usuario solo puede contener letras, números y guiones bajos."
        );

      const user = await User.findOne({
        where: {
          username: value,
        },
      });

      if (user) throw new Error("El nombre de usuario ya existe.");

      return true;
    }),
  body("email")
    .isEmail()
    .withMessage("El email no es válido.")
    .custom(async (value) => {
      const user = await User.findOne({
        where: {
          email: value,
        },
      });

      if (user) throw new Error("El email ya existe.");

      return true;
    }),
  body("nombre")
    .isLength({ min: 1 })
    .withMessage("El nombre no puede estar vacio")
    .isString(),
  body("apellido")
    .isLength({ min: 1 })
    .withMessage("El apellido no puede estar vacio")
    .isString(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener un mínimo de 6 caracteres."),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden.");
    }
    return true;
  }),
  validationErrors,
];
