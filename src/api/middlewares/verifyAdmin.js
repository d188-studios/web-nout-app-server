module.exports = function verifyAdmin(req, res, next) {
  if (req.user.administrador) next();
  else res.sendStatus(403);
};
