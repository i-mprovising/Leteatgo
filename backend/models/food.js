const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');
module.exports = class Food extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            foodid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            material: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            Name: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            Kind: {
                type: Sequelize.TINYINT,
                allowNull: false,
            },
            Image: {
                type: Sequelize.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            paranoid: false,
            modelName: 'Food',
            tableName: 'food',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Food.hasOne(db.Recipe, {
            foreignKey: "foodid", sourceKey: "foodid"
        });
        db.Food.belongsToMany(db.Recipe, {
            foreignKey: "foodid",
            sourceKey: "foodid",
        });
    }
    
};