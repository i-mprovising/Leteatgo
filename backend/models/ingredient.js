const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = class Ingredient extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            index: {
                type: Sequelize.INTEGER,
                allowNull:false,
                autoIncrement:true,
                primaryKey:true
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull : false
            },
            materials: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category: {
                type: Sequelize.SMALLINT(12),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'Ingredient',
            tableName: 'ingredient',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
};