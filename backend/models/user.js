const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            userid: {
                type: Sequelize.INTEGER,
                allowNull : false,
                autoIncrement: true,
                primaryKey: true
            },
            id: {
                type: Sequelize.STRING(50),
                unique : true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            nickname: {
                type: Sequelize.STRING(15),
                allowNull : false,
            },
            sex: {
                type: Sequelize.BOOLEAN,
                allowNull : false,
            },
            role: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: true,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};