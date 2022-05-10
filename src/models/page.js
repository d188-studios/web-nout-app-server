"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Content }) {
      // define association here
      //this.belongsTo(User, { foreignKey: "owner" });
      this.belongsTo(User, { foreignKey: "owner" });
      this.hasOne(Content, { foreignKey: "pageId" });
    }
  }
  Page.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      parent: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      owner: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expanded: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "pages",
      //timestamps: false,
      modelName: "Page",
    }
  );
  return Page;
};
