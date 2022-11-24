const path = require('path');
const fs = require('fs');
const Food = require('../models/food');
const Ingredient = require('../models/ingredient');
const { Op } = require("sequelize");
const CODE = require("../modules/statusCode");
const spawn = require('child_process').spawn;
function recommPromise(userid){
    return new Promise(async function (resolve, reject){
        console.log("hi");
        const userIngre = await Ingredient.findAll({
            row: true,
            attributes: ['materials'],
            where:{
                userid: userid
            }
        });
        let str = "두부 버터 다진돼지고기";
            /*for(let i = 0 ; i<userIngre; i++){
                str = str + userIngre[i].dataValues.materials
                if(i < userIngre -1) str = str + " ";
            }*/
        var secondData = "";
        if(str){
            const result = await spawn('python3', ['./py/usermaterial.py', str]);
            await result.stdout.on('data', function(data) {
                // console.log("stdout", data.toString());
                secondData = data.toString();
                resolve(secondData);
            });

            result.stderr.on('data', function(data) {
                console.error("stderr", data.toString());
                resolve(data);
            });
        }
        //console.log(secondData)
    });
};
const main = {
    main : async(req, res, err) => { 
    try{
            let section = [];
            const isReq = req;
            if(req){
            let userid = req.query.userid;
            let csvFile = fs.readFileSync('./csv/Hybrid_predict.csv', "utf-8");
            let parseCSV = csvFile.split('\n');
            parseCSV.shift();
            //console.log(parseCSV.length);
            if(parseCSV.length < userid || userid < 0){
                return res.json({statusCode: CODE.FAIL, msg:"해당 유저는 없습니다."});
            }
            //console.log(parseCSV);
            let userstr = parseCSV[userid];
            let data = userstr.split(","); //오류가 좀있음 유저가 삭제될경우 모순발생 userid가 붕떠버린다?
            //console.log(data);
            const recommendUser = await Food.findAll({
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
            section.push(finaldata);

            
            let secondData;

            const pythonres = await recommPromise(req.query.userid).then((data) => {
                secondData = data
            });
            secondData = secondData.replace("[" , "");
            secondData = secondData.replace("]" , "");
            secondData = secondData.replace("\n" , "");
            secondData = secondData.split(",");
            console.log(secondData);
            const nlpRecommend = await Food.findAll({
                attributes: ['Name', 'Image', 'foodid'],
                row:true,
                where: {
                    foodid : {[Op.in]: secondData}
                }
            });
            secondData = [];
            for(let i = 0; i < nlpRecommend.length; i++){
                secondData.push(nlpRecommend[i].dataValues);
            }
            section.push(secondData);
            return res.json({statusCode:CODE.SUCCESS, msg:"성공", data: section});
            }
        }catch(error){
            console.error(error);
            return res.json({statusCode:CODE.FAIL, msg:"실패"});
        }
    }
}

module.exports = main;