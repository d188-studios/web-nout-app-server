"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movimientosDeUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      this.belongsTo(User, { foreignKey: "id_usuario" });
    }
  }
  movimientosDeUsuario.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      id_usuario: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      movimiento: {
        type: DataTypes.STRING,
      },
      fecha_de_movimiento: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      sequelize,
      modelName: "movimientosDeUsuario",
      tableName: "movimientos_de_usuario",
      timestamps: false,
    }
  );
  return movimientosDeUsuario;
};
