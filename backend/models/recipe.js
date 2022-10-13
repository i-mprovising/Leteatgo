const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Recipe extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            recipeid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            material: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            order: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            video: {
                type: Sequelize.STRING(1000),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'Recipe',
            tableName: 'recipe',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Recipe.belongsTo(db.Food, {
            foreignKey: "userid", sourceKey: "userid"
        });
    }
};