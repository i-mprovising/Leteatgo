const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Mock extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            foodid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            rating: {
                type: Sequelize.FLOAT.UNSIGNED,
                allowNull: true,
                defaultValue: 0
            },
            sex: {
                type: Sequelize.BOOLEAN,
                allowNull : false
            }
        },
        {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'Mock',
            tableName: 'mocking',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
}