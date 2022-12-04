const Food = require("../models/food");
const Prefer = require("../models/prefer");
const CODE = require("../modules/statusCode");
const Sequelize = require("sequelize");
const recommend = require("./recommendController");
const Op = Sequelize.Op;

const survey = {
  taste: async (req, res, next) => {
    try {
      const prefer = await Food.findAll({
        order: [Sequelize.fn("RAND")],
        limit: 60,
        attributes: ["foodid", "Name", "Image"],
      });
      console.log(prefer.length);
      return res.json({
        statusCode: CODE.SUCCESS,
        msg: "60개 음식을 뿌렸습니다.",
        food: prefer,
      });
    } catch (error) {
      return res.json({ statusCode: CODE.FAIL, msg: "fail" });
    }
  },
  save: async (req, res, next) => {
    try {
      const arr = req.body.prefer;
      const likearr = arr.like;
      const dislike = arr.dislike;
      const userid = req.body.userid;
      const findFlag = await Prefer.findAll({
        attributes: ["foodid"],
        row: true,
        where: {
          userid: userid,
        },
      });
      let userFood = [];
      console.log(arr);
      for (let i = 0; i < findFlag.length; i++) {
        userFood[i] = findFlag[i].dataValues.foodid;
      }
      console.log(userFood);
      for (item of likearr) {
        console.log(item);
        console.log(userFood.indexOf(item));
        if (userFood.indexOf(item) < 0) {
          const likeResult = await Prefer.create({
            foodid: item,
            userid: userid,
            survey: 1,
          });
        } else {
          const isPrefer = await Prefer.update(
            {
              survey: 1,
            },
            {
              where: {
                userid: userid,
                foodid: item,
                survey: { [Op.ne]: 1 },
              },
            }
          );
        }
      }
      for (item of dislike) {
        if (userFood.indexOf(item) < 0) {
          const dislikeResult = await Prefer.create({
            foodid: item,
            userid: userid,
            survey: -1,
          });
        } else {
          const notPrefer = await Prefer.update(
            {
              survey: -1,
            },
            {
              where: {
                userid: userid,
                foodid: item,
                survey: { [Op.ne]: -1 },
              },
            }
          );
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
        msg: "database error",
      });
    }
  },
};

module.exports = survey;
