"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Race extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Race.belongsTo(models.User, { foreignKey: "owner_id" });
      Race.belongsTo(models.Unique, { foreignKey: "unique_id" });
    }
  }
  Race.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id"
        }
      },
      small: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      medium: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      large: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unique_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "uniques",
          key: "id"
        }
      }
    },
    {
      sequelize,
      modelName: "Race",
      tableName: "races"
    }
  );
  return Race;
};
