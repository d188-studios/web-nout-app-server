require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  validateUser,
  validateSignIn,
  validatePasswordReset,
} = require("../middlewares");
const { authService, mailerService, usersService } = require("../../services");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

module.exports = function auth(app) {
  app.use("/auth", router);
  router.post("/signup", validateUser, async (req, res, next) => {
    try {
      const user = await authService.signUp(
        req.body.username,
        req.body.email,
        req.body.password
      );

      const token = jwt.sign(
        {
          uuid: user.uuid,
        },
        process.env.JWT_VERIFICATION_SECRET,
        { expiresIn: "1h" }
      );
      await mailerService.sendVerificationEmail(user.email, token);

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(403).json({ error: error.message });
    }
  });

  router.post("/signin", validateSignIn, async (req, res) => {
    try {
      const user = await authService.signIn(
        req.body.username,
        req.body.password
      );

      const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET);
      delete user.password;
      res.json({ token, user });
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });

  router.get("/me", verifyToken, async (req, res) => {
    delete req.user.password;
    res.json(req.user);
  });

  router.post("/verify-account/:token", async (req, res) => {
    jwt.verify(
      req.params.token,
      process.env.JWT_VERIFICATION_SECRET,
      (err, user) => {
        if (err) return res.sendStatus(403);
        usersService
          .auhorizeUser(user.uuid)
          .then(() => {
            res.sendStatus(200);
          })
          .catch(() => {
            res.sendStatus(403);
          });
      }
    );
  });

  router.post("/reset-password", async (req, res) => {
    try {
      const user = await authService.getUserByEmail(req.body.email);
      const token = jwt.sign(
        {
          uuid: user.uuid,
        },
        process.env.JWT_RESET_PASSWORD_SECRET,
        { expiresIn: "1h" }
      );
      await mailerService.sendPasswordResetEmail(user.email, token);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });

  router.post(
    "/reset-password/:token",
    validatePasswordReset,
    async (req, res) => {
      jwt.verify(
        req.params.token,
        process.env.JWT_RESET_PASSWORD_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);
          usersService
            .updatePassword(user.uuid, req.body.password)
            .then(() => {
              res.sendStatus(200);
            })
            .catch((e) => {
              console.log(e);
              res.sendStatus(403);
            });
        }
      );
    }
  );
};
