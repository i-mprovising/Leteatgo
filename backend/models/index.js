const Sequelize = require("sequelize");
const User = require("./user");
const Food = require("./food");
const Recipe = require("./recipe");
const Prefer = require("./prefer");
const Ingredient = require("./ingredient");
const Cart = require("./cart");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);


db.sequelize = sequelize;

db.Food = Food;
db.User = User;
db.Recipe = Recipe;
db.Prefer = Prefer;
db.Ingredient = Ingredient;
db.Cart = Cart;

Prefer.init(sequelize);
Food.init(sequelize);
User.init(sequelize);
Recipe.init(sequelize);
Ingredient.init(sequelize);
Cart.init(sequelize);


module.exports = db;


