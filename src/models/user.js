"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Page,
      Encuesta,
      Verificacion,
      movimientosDeUsuario,
      movimientosDePagina,
    }) {
      // define association here
      this.hasMany(Page, { foreignKey: "owner" });
      this.hasOne(Encuesta, { foreignKey: "encuestado" });
      this.hasOne(Verificacion, { foreignKey: "usuario" });
      this.hasMany(movimientosDeUsuario, { foreignKey: "id_usuario" });
      this.hasMany(movimientosDePagina, { foreignKey: "id_usuario" });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      nombre: {
        type: DataTypes.STRING,
        //allowNull: false,
      },

      apellido: {
        type: DataTypes.STRING,
        //allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      administrador: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      baneado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
