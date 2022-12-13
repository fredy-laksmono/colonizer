"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("races", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id"
        }
      },
      small: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      medium: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      large: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      unique_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "uniques",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("races");
  }
};
