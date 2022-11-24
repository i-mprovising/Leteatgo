const Prefer = require("../models/prefer");
const CODE = require("../modules/statusCode");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { PythonShell } = require("python-shell");
const Food = require('../models/food');
const { Op } = require("sequelize");
const User = require('../models/user');
const path = require('path');
const fs = require('fs');

const recommend = {
    write: async() => {
        let data = [];
        const csvWriter = createCsvWriter({
            path: './csv/prefer.csv',
            header: [
            {id: 'userid', title: 'userid'},
            {id: 'sex', title: 'sex'},
            {id: 'foodid', title: 'foodid'},
            {id: 'survey', title: 'survey'},
            {id: 'like', title: 'like'},
            {id: 'made', title: 'made'},
            {id: 'view', title: 'view'}
            ]
        });
        let userid = [];
        const totalPrefer = await Prefer.findAll();
        for(let j = 0 ; j< totalPrefer.length; j++){
            userid.push(totalPrefer[j].dataValues.userid);
        }
        const set = new Set(userid);
        const uniqueid = [...set];
        //console.log(uniqueid);
        const userSex = await User.findAll({
            attributes: ['sex', 'userid'],
            row:true,
            where: {
                userid: {[Op.in]: uniqueid}
            }
        });
        let sexInfo = [];
        for(let i = 0 ; i< userSex.length; i++){
            sexInfo[i] = userSex[i].dataValues.sex;
        }
        for(let i = 0 ; i < totalPrefer.length; i++ ){
            let made = totalPrefer[i].dataValues.made;
            let favorite = totalPrefer[i].dataValues.favorite;
            let userid = totalPrefer[i].dataValues.userid;
            //console.log(userid);
            let sex = sexInfo[userid];
            //console.log(sex);
            if(made) made = 1;
            else made = 0;
            if(favorite) favorite = 1;
            else favorite = 0;
            if(sex)  sex = 1;
            else sex = 0;
            
            data.push({
                userid: userid,
                sex: sex,
                foodid: totalPrefer[i].dataValues.foodid,
                survey: totalPrefer[i].dataValues.survey,
                like: favorite,
                made: made,
                view:  totalPrefer[i].dataValues.view,

            })
        }
        //console.log(data);
        csvWriter.writeRecords(data)
        console.log('The CSV file was written successfully');
    },
    best: async(req, res,err) => {
    try{
            let options = {
                scriptPath: "."
            };
            let top5 = [];
            PythonShell.run("prefer.py", options, async function(err, data) {
                if (err) throw err;
                console.log(data);
                for(let i = 0; i<data.length;i++){
                    top5[i] = data[i].split(' ', 1).toString();
                }
                const topFood = await Food.findAll({
                    attributes: ['Name', 'Image', 'foodid'],
                    where: {
                        foodid : {[Op.in]: top5}
                    }
            });
            top5 = [];
            for(let i = 0; i< topFood.length; i++){
                let foodjson = {};
                foodjson.name = topFood[i].dataValues.Name;
                foodjson.image = topFood[i].dataValues.Image;
                foodjson.foodid = topFood[i].dataValues.foodid;
                top5.push(foodjson);
            }
            return res.json({msg: "top 5 음식들입니다.", statusCode : CODE.SUCCESS, result: top5})
        })}
    catch(error){
        console.error(error);
        return res.json({msg: "fail", statusCode: CODE.FAIL});
    }
    }
};

module.exports = recommend;