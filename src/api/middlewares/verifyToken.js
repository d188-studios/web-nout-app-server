require("dotenv").config();
const { usersService } = require("../../services/");
const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader === "undefined") return res.sendStatus(403);

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;

  jwt.verify(req.token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    usersService
      .getUserByUuid(user.uuid)
      .then(async (user) => {
        if (user.baneado) return res.sendStatus(401);
        const verifiedValue = await usersService.getVerifiedValue(user.uuid);
        const encuestaValue = await usersService.getEncuestaValue(user.uuid);
        user.survey = encuestaValue.contestada;
        user.authorized = verifiedValue.verificado;
        req.user = user;
        next();
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });
};
