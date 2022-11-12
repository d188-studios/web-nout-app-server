"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Encuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      this.belongsTo(User, { foreignKey: "encuestado" });
    }
  }
  Encuesta.init(
    {
      id_encuesta: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      encuestado: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      calificacion_diseño_visual: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      calificacion_experiencia_usuario: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      calificacion_utilidad_aplicacion: {
        type: DataTypes.REAL,
        allowNull: true,
      },
      profesion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contestada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Encuesta",
      tableName: "encuestas",
      timestamps: false,
    }
  );
  return Encuesta;
};
