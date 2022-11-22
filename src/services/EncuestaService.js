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

    await encuesta.update({
      calificacion_diseño_visual: visualScore,
      calificacion_experiencia_usuario: UXscore,
      calificacion_utilidad_aplicacion: utilityScore,
      profesion,
      contestada: true,
    });

    const updatedEncuesta = await this.encuestasModel.findOne({
      where: { encuestado },
    });
    return updatedEncuesta.dataValues;
  }
}

module.exports = EncuestaService;
