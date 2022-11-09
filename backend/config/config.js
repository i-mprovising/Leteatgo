const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    "development":{
    "username" : "admin",
    "password" : process.env.DB_PASSWORD,
    "database" : "develop",
    "host" : "leteatgo.cuom1ib1jx9z.ap-northeast-2.rds.amazonaws.com",
    "dialect" : "mysql"
    },
    "test": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "database_test",
    "host": "leteatgo.cuom1ib1jx9z.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
    },
  "production": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "leteatgo",
    "host": "leteatgo.cuom1ib1jx9z.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  }
}