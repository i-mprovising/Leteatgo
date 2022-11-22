const Ingredient = require('../models/ingredient');
const CODE = require('../modules/statusCode');
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const { Cart } = require('../models');

const ingredient = {
    add: async(req, res, err) => {
        try{
            const userid = req.body.userid;
            const material = req.body.material;
            let pushData = [];
            for(let i = 0; i< material.length; i++){
                const findFlag = await Ingredient.findOne({
                    where: {
                        materials: material[i]["name"],
                        userid: userid
                    }
                })
                if(!findFlag) pushData.push(material[i]);
            }
            if(!pushData){
                return res.json({msg:"모두 유저가 보유하고있는 식자재입니다"})
            }
            
            for(let i = 0; i < pushData.length; i++){
                await Ingredient.create({
                    materials: pushData[i]["name"],
                    userid: userid,
                    category: pushData[i]["category"]
                });
            };
            const totalCart = await Ingredient.findAll({
                where:{
                    userid: userid
                }
            });       
            return res.json({msg:"사용자의 보유식자재 정보를 생성했습니다.", statusCode: CODE.SUCCESS, result:totalCart})
        }catch(error){
            console.error(error);
            return res.json({msg:"데이터베이스 오류", statusCode: CODE.FAIL, result: 0});
        }
    },
    delete: async(req, res, err) => {
        try{
            const deleteIndex = req.query.index;
            const userid = req.query.userid;
            const del = await Ingredient.destroy({
                where:{
                    index: deleteIndex
                }
            });     
            const totalCart = await Ingredient.findAll({
                where:{
                    userid: userid
                }
            });  
            if(!del){
                return res.json({msg:"삭제하고자 하는 식자재가 데이터베이스에 없습니다.", statusCode: CODE.SUCCESS, result: totalCart});
            }
            return res.json({msg:"데이터 삭제완료", statusCode: CODE.SUCCESS, result: totalCart });
        }catch(error){
            console.error(error);
            return res.json({msg: "데이터베이스 오류", statusCode: CODE.FAIL, result: 0});
        }
    },
    get: async(req, res, err) => {
        try{
            const userid = req.query.userid;
            const totalCart = await Ingredient.findAll({
                where:{
                    userid: userid
                }
            }); 
            return res.json({msg:"해당 유저의 보유 식재료 정보입니다.", result: totalCart});
        }catch(error){
            console.error(error);
            return res.json({msg:"데이터베이스 오류입니다.", statusCode: CODE.FAIL });
        }
    }
}

module.exports = ingredient;