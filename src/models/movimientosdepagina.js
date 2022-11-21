"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movimientosDePagina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Page, User }) {
      this.belongsTo(Page, { foreignKey: "id_pagina" });
      this.belongsTo(User, { foreignKey: "id_usuario" });
    }
  }
  movimientosDePagina.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      id_usuario: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      id_pagina: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      movimiento: {
        type: DataTypes.STRING,
      },
      fecha_de_movimiento: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "movimientosDePagina",
      tableName: "movimientos_de_pagina",
      timestamps: false,
    }
  );
  return movimientosDePagina;
};
