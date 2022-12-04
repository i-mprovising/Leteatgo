const path = require("path");
const fs = require("fs");
const Food = require("../models/food");
const recommend = require("./recommendController");
const Ingredient = require("../models/ingredient");
const { PythonShell } = require("python-shell");
const { Op } = require("sequelize");
const CODE = require("../modules/statusCode");
const mainFile = require("../server");
const spawn = require("child_process").spawn;
function recommPromise(userid) {
  return new Promise(async function (resolve, reject) {
    const userIngre = await Ingredient.findAll({
      row: true,
      attributes: ["materials"],
      where: {
        userid: userid,
      },
    });
    let str = "";
    for (let i = 0; i < userIngre.length; i++) {
      str = str + userIngre[i].dataValues.materials;
      str = str + " ";
    }
    //console.log(str);
    // console.log(str[2]);
    var secondData = "";
    if (str) {
      // console.log("str");
      const result = await spawn("python3", ["./py/usermaterial.py", str]);
      await result.stdout.on("data", function (data) {
        // console.log("stdout", data.toString());
        secondData = data.toString();
        resolve(secondData);
      });
      result.stderr.on("data", function (data) {
        console.error("stderr", data.toString());
        resolve(data);
      });
    } else {
      resolve([]);
    }
    //console.log(secondData)
  });
}
const main = {
  main: async (req, res, err) => {
    try {
      let section = [];
      const isReq = req;
      if (req) {
        let userid = req.query.userid;
        await recommend.write();
        let options = {
          scriptPath: ".",
        };
        await PythonShell.run(
          "./py/recommend.py",
          options,
          async function (err, data) {
            if (err) throw err;
            console.log(data);
          }
        );
        let csvFile = fs.readFileSync("./csv/Hybrid_predict.csv", "utf-8");
        let parseCSV = csvFile.split("\n");
        let index = parseCSV.length;
        parseCSV.shift();

        for (let i = 0; i < parseCSV.length; i++) {
          let str;
          str = parseCSV[i].split(",");
          // console.log(typeof(str[1]));
          if (parseInt(str[1]) == userid) {
            index = i;
            break;
          }
        }
        let finaldata = [];
        // console.log(index);
        if (index < parseCSV.length) {
          let userstr = parseCSV[index];
          let data = userstr.split(","); //오류가 좀있음 유저가 삭제될경우 모순발생 userid가 붕떠버린다?
          data = data.slice(2);
          let temp;
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            temp = data[i].replaceAll('"', "");
            temp = temp.replaceAll("'", "");
            temp = temp.replaceAll(" ", "");
            data[i] = parseInt(temp);
          }
          const recommendUser = await Food.findAll({
            attributes: ["Name", "Image", "foodid"],
            where: {
              foodid: { [Op.in]: data },
            },
          });
          // console.log(recommendUser);
          for (let i = 0; i < recommendUser.length; i++) {
            let foodjson = {};
            foodjson.name = recommendUser[i].dataValues.Name;
            foodjson.image = recommendUser[i].dataValues.Image;
            foodjson.foodid = recommendUser[i].dataValues.foodid;
            finaldata.push(foodjson);
          }
        }
        console.log("final data", finaldata);
        section.push(finaldata);
        let secondData;
        const pythonres = await recommPromise(req.query.userid).then((data) => {
          secondData = data;
        });
        // console.log(secondData);
        if (secondData.length) {
          secondData = secondData.replace("[", "");
          secondData = secondData.replace("]", "");
          secondData = secondData.replace("\n", "");
          secondData = secondData.split(",");
        }
        const nlpRecommend = await Food.findAll({
          attributes: ["Name", "Image", "foodid"],
          row: true,
          where: {
            foodid: { [Op.in]: secondData },
          },
        });
        secondData = [];
        console.log("second data", secondData);
        for (let i = 0; i < nlpRecommend.length; i++) {
          secondData.push(nlpRecommend[i].dataValues);
        }
        console.log("final data", section);
        section.push(secondData);
        return res.json({
          statusCode: CODE.SUCCESS,
          msg: "성공",
          data: section,
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({ statusCode: CODE.FAIL, msg: "실패" });
    }
  },
};

module.exports = main;
