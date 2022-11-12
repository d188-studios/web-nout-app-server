class EncuestaService {
  constructor(encuestasModel) {
    this.encuestasModel = encuestasModel;
  }

  async getValueOfContestada(encuestado) {
    const encuesta = await this.encuestasModel.findOne({
      where: {
        encuestado,
      },
    });

    if (!encuesta) {
      throw new Error("Survey not found");
    }

    return encuesta.dataValues;
  }

  async submitSurvey(
    encuestado,
    visualScore,
    UXscore,
    utilityScore,
    profesion
  ) {
    const encuesta = await this.encuestasModel.findOne({
      where: { encuestado },
    });

    if (!encuesta) {
      throw new Error("Survey not found");
    }

    console.log(
      `vs: ${visualScore}\nux: ${UXscore}\nut: ${utilityScore}\nprofesion: ${profesion}`
    );

    /* await encuesta.update({
      
    }); */

    return encuesta.dataValues;
  }
}

module.exports = EncuestaService;
