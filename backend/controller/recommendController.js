const Prefer = require("../models/prefer");
const CODE = require("../modules/statusCode");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { PythonShell } = require("python-shell");
const Food = require('../models/food');
const { Op } = require("sequelize");
const User = require('../models/user');

const recommend = {
    best: async(req, res,err) => {
    try{
        let data = [];
        const csvWriter = createCsvWriter({
            path: './prefer.csv',
            header: [
            {id: 'userid', title: 'userid'},
            {id: 'foodid', title: 'foodid'},
            {id: 'survey', title: 'survey'},
            {id: 'like', title: 'like'},
            {id: 'made', title: 'made'},
            {id: 'view', title: 'view'},
           // {id: 'sex', title: 'sex'}
            ]
        });
        let options = {
            scriptPath: "."
        };
        let top5 = [];

        const totalPrefer = await Prefer.findAll();
        /*for(let j = 0 ; j< totalPrefer.length; j++){
            userid.push(totalPrefer[j].dataValues.userid);
        }
        const set = new Set(userid);
        const uniqueid = [...set];
        console.log(uniqueid);
        const userSex = await User.findAll({
            attributes: ['sex', 'userid'],
            where: {
                userid: {[Op.in]: uniqueid}
            }
        });
        console.log(userSex.length);*/
        
        //console.log(totalPrefer[0].dataValues);
        for(let i = 0 ; i < totalPrefer.length; i++ ){
            let made = totalPrefer[i].dataValues.made;
            let favorite = totalPrefer[i].dataValues.favorite;
            if(made) made = 1;
            else made = 0;
            if(favorite) favorite = 1;
            else favorite = 0;
            data.push({
                userid: totalPrefer[i].dataValues.userid,
                foodid: totalPrefer[i].dataValues.foodid,
                like: favorite,
                survey: totalPrefer[i].dataValues.survey,
                made: made,
                view:  totalPrefer[i].dataValues.view,
                totalview:  totalPrefer[i].dataValues.totalview
                //sex :
            })
        }
        csvWriter.writeRecords(data).
        then(()=> {
            console.log('The CSV file was written successfully');
            PythonShell.run("prefer.py", options, async function(err, data) {
                if (err) throw err;
                console.log(data);
                for(let i = 1; i<6;i++){
                    top5[i-1] = data[i].split(' ', 1).toString();
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
        })})
        .catch(function(error){
            console.error(error);
            return res.json({msg: "fail", statusCode: CODE.FAIL});
        })
    }catch(error){
        console.error(error);
        return res.json({msg: "fail", statusCode: CODE.FAIL});
    }
    }
};

module.exports = recommend;