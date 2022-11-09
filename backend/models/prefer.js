const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");
module.exports = class Prefer extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        foodid: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        survey: {
          type: Sequelize.SMALLINT,
          allowNull: true,
        },
        favorite: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        made: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        view: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        paranoid: false,
        modelName: "Prefer",
        tableName: "prefer",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
