const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = class Cart extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            index: {
                type:Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull : false
            },
            materials: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'Cart',
            tableName: 'cart',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
};