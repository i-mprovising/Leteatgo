const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');

const { sequelize } = require('./models/index');
const userRouter = require('./routes/user');
const checkRouter = require('./routes/check');
const recipeRouter = require('./routes/recipe');
const testRouter = require('./routes/test');
const searchRouter = require('./routes/search');
const surveyRouter = require('./routes/survey');
const app = express();

app.set('port', process.env.PORT || 80);

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));

db.sequelize.sync().then(() => {
        console.log('db connect success');
    }).catch(console.error);

app.use(session({ secret: 'SECRET' }));

app.use(
  session({
    resave: false,
    saveUninitalized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);    

app.use('/', userRouter);
app.use('/', recipeRouter);
app.use('/check', checkRouter);
app.use('/test', testRouter);
app.use('/search', searchRouter);
app.use('/survey', surveyRouter );

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);
  });
  
  app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
  });
