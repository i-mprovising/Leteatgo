const Food = require("../models/food");
const Prefer = require("../models/prefer");
const CODE = require("../modules/statusCode");
const Sequelize = require("sequelize");
const recommend = require("../controller/recommendController");
const main = require("../controller/mainController");

const survey = {
  taste: async (req, res, next) => {
    try {
      const prefer = await Food.findAll({ order: [Sequelize.fn('RAND')], limit: 60, attributes:['foodid', 'Name', 'Image']});
      console.log(prefer.length);
      return res.json({statusCode: CODE.SUCCESS, msg:"60개 음식을 뿌렸습니다.", food: prefer});
    } catch (error) {
      return res.json({statusCode: CODE.FAIL, msg:"fail"})
    }
  },
  save: async (req, res, next) => {
    try {
      const arr = req.body.prefer;
      const likearr = arr.like;
      const dislike = arr.dislike;
      console.log(likearr);
      for(item of likearr){
          const isPrefer = await Prefer.update({  
            survey: 1
            }, {
              where:{
              userid: req.body.userid,
              foodid: item
            }}
          ); // 있는지 확인하고 업데이트 없으면 0반환
          if(isPrefer){ //없는 경우
            const likeResult = await Prefer.create({
              foodid: item,
              userid: req.body.userid,
              survey: 1
            });
          }
      }
      for(item of dislike){
        const isPrefer = await Prefer.update({  
          survey: -1
          }, {
            where:{
            userid: req.body.userid,
            foodid: item
          }}
        ); // 있는지 확인하고 업데이트 없으면 0반환
        if(isPrefer){ //없는 경우
          const likeResult = await Prefer.create({
            foodid: item,
            userid: req.body.userid,
            survey: -1
          });
        }
      }
      await recommend.write();
      return res.json({
        statusCode: CODE.SUCCESS,
        msg: "create user successfully",
      });
    } catch (err) {
      console.error(err);
      return res.json({
        statusCode: CODE.FAIL,
        msg: "database error"
      });
    }
  },
};

module.exports = survey;
