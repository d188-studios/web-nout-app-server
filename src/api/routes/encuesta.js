require("dotenv").config();
const express = require("express");
const { verifyToken, validateSurvey } = require("../middlewares/");
const { encuestaService } = require("../../services");
const { Encuesta } = require("../../models");
const db = require("../../models/index");

const router = express.Router();

module.exports = function survey(app) {
  app.use("/survey", router);
  router.get("/", verifyToken, async (req, res) => {
    const encuesta = await encuestaService.getValueOfContestada(req.user.uuid);
    res.json(encuesta);
  });

  router.post("/", verifyToken, validateSurvey, async (req, res) => {
    try {
      const survey = await Encuesta.findOne({
        where: {
          encuestado: req.user.uuid,
        },
      });

      /* if (survey.dataValues.contestada)
        throw new Error("The survey had alredy been submited");
 */
      const updatedSurvey = await encuestaService.submitSurvey(
        req.user.uuid,
        req.body.visualScore,
        req.body.UXscore,
        req.body.utilityScore,
        req.body.profesion
      );

      res.json(updatedSurvey);
    } catch (e) {
      console.log(e);
      res.sendStatus(403);
    }
  });
};
