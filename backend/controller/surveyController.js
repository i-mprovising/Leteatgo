const Food = require("../models/food");
const Prefer = require("../models/prefer");
const CODE = require("../modules/statusCode");
const Sequelize = require("sequelize");

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
      //console.log(likearr, dislike);
      for(item of likearr){
          console.log(typeof(item));
          const likeResult = await Prefer.create({
            foodid: item,
            userid: req.body.userid,
            survey: 1
          });
          console.log("Asdasd");
      }
      for(let j = 0 ; j< dislike.length; j++){
        const dislikeResult = await Prefer.create({
            foodid: arr.dislike[j],
            userid: req.body.userid,
            survey: -1
        });
      }
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
