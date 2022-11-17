const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./models');
const { PythonShell } = require("python-shell");

const { sequelize } = require('./models/index');
const userRouter = require('./routes/user');
const checkRouter = require('./routes/check');
const recipeRouter = require('./routes/recipe');
//const testRouter = require('./routes/test');
const searchRouter = require('./routes/search');
const surveyRouter = require('./routes/survey');
const recommendRouter = require('./routes/recommend');
const mainRouter = require('./routes/main');
const recommend = require('./controller/recommendController');
const main = require('./controller/mainController');
const startInterval = (seconds, callback) => {
  callback();
  return setInterval(callback, seconds*1000);
};
const app = express();
const updateHybrid = async() => {
  try{
    let options = {
        scriptPath: "."
    };
    PythonShell.run("recommend.py", options, async function(err, data) {
        if (err) throw err;
        console.log(data);
    })
    }catch(error){
      console.error(error);
    }
};
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
//보유식재료 => 가지고있는거 띄워주는거, 업데이트하는거, 삭제하는거
//prefer csv업데이트 -> 
startInterval(60*60*2, async function() {
    await recommend.write();
    updateHybrid();
});

app.use('/', mainRouter);
app.use('/', recipeRouter);
app.use('/user', userRouter);
app.use('/check', checkRouter);
//app.use('/test', testRouter);
app.use('/search', searchRouter);
app.use('/survey', surveyRouter );
app.use('/recommend', recommendRouter);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);
  });
  
  app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기중");
  });
