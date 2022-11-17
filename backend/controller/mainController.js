const path = require('path');
const fs = require('fs');
const Food = require('../models/food');
const { Op } = require("sequelize");
const CODE = require("../modules/statusCode");

const main = {
    itemMf : async(req, res, err) => { 
    try{
            const isReq = req;
            if(req){
            let userid = req.query.userid;
            let csvFile = fs.readFileSync('Hybrid_predict.csv', "utf-8");
            let parseCSV = csvFile.split('\n');
            parseCSV.shift();
            console.log(parseCSV.length);
            if(parseCSV.length < userid || userid < 0){
                return res.json({statusCode: CODE.FAIL, msg:"해당 유저는 없습니다."});
            }
            let userstr = parseCSV[userid];
            //console.log(userstr);
            let data = userstr.split(",");
            //console.log(data)
;            const recommendUser = await Food.findAll({
                attributes: ['Name', 'Image', 'foodid'],
                where: {
                    foodid : {[Op.in]: data}
                }
        });
        let finaldata = [];
                for(let i = 0; i< recommendUser.length; i++){
                    let foodjson = {};
                    foodjson.name = recommendUser[i].dataValues.Name;
                    foodjson.image = recommendUser[i].dataValues.Image;
                    foodjson.foodid = recommendUser[i].dataValues.foodid;
                    finaldata.push(foodjson);
                }
                console.log(finaldata);
            return res.json({statusCode:CODE.SUCCESS, msg:"성공", data: finaldata});
            }
        }catch(error){
            console.error(error);
            return res.json({statusCode:CODE.SUCCESS, msg:"실패"});
        }
    }
}

module.exports = main;