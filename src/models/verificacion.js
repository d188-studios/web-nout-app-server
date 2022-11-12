"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Verificacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      this.belongsTo(User, { foreignKey: "usuario" });
    }
  }
  Verificacion.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      usuario: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fecha_enviado: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      verificado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Verificacion",
      tableName: "verificaciones",
      timestamps: false,
    }
  );
  return Verificacion;
};
