const User = require('../models/user');
const Food = require('../models/food');
const bcrypt = require('bcrypt');
const CODE = require('../modules/statusCode');
const Prefer = require("../models/prefer");
const { Op } = require("sequelize");

const user = {
    signup: async (req, res ,next) => {
            try{
                const checkId =  await User.findOne({
                    where: {
                        id: req.body.id
                    }
                });
                const checkNickname = await User.findOne({
                    where: {
                        nickname: req.body.nickname
                    }
                });
                if(checkId){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "id that already exists"});
                }
                if(checkNickname){
                    return res.json({ statusCode: CODE.DUPLICATE, msg: "nickname that already exists"});
                }

                const hashedpw = await bcrypt.hash(req.body.password, 12);
                await User.create({
                    nickname : req.body.nickname,
                    id : req.body.id,
                    password: hashedpw,
                    sex : req.body.sex
                });
                return res.json({ statusCode: CODE.SUCCESS, msg: "create user successfully"});
            } catch(err){
                console.error(err);
                next(err);
            }
    },
    signin : async (req, res, next) => {
        try{        
            const userpassword = req.body.password;
            const userInfo = await User.findOne({
                where :{
                    id: req.body.id
                }
            }); 
            console.log(userInfo);

            if(!userInfo){
                return res.json({ statusCode: CODE.FAIL, msg: "signin fail"});
            }
            else{
                const isEqualPw = await bcrypt.compare(userpassword, userInfo.password);

                if(isEqualPw) {
                    return res.json({ statusCode: CODE.SUCCESS, msg: "login success"});
                } 
                else{
                    return res.json({ statusCode: CODE.FAIL, msg: "signin fail"});
                }
            }
        }catch(error){
            console.error(error);
            return res.json({ statusCode: CODE.SERVER_ERROR, msg: "server error"});
        }
    },
    made: async(req, res, err) => {
        try{
            const userMade = await Prefer.findAll({
                attributes : ['foodid'],
                raw:true,
                where:{
                    userid: req.query.userid,
                    made: true
                }
            });
            let foodarr = [];
            for(let i = 0 ; i<userMade.length; i++){
                foodarr.push(userMade[i].foodid);
            }
            console.log(foodarr);
            const foodData = await Food.findAll({
                attributes: ['Name', 'Image', 'foodid'],
                raw:true,
                where: {
                    foodid : {[Op.in]: foodarr}
                }
            });
            return res.json({ statusCode: CODE.SUCCESS, msg: "만들어본 음식들 리스트입니다.", result: foodData});
        }catch(err){
            console.error(err);
            return res.json({statusCode: CODE.FAIL, msg:"데이터베이스 오류"});
        }
    },
    like : async(req, res, err) => {
        try{
            const userLike = await Prefer.findAll({
                attributes : ['foodid'],
                raw:true,
                where:{
                    userid: req.query.userid,
                    favorite: true
                }
            });
            let foodarr = [];
            for(let i = 0 ; i<userLike.length; i++){
                foodarr.push(userLike[i].foodid);
            }
            const foodData = await Food.findAll({
                attributes: ['Name', 'Image', 'foodid'],
                raw:true,
                where: {
                    foodid : {[Op.in]: foodarr}
                }
            });
            return res.json({ statusCode: CODE.SUCCESS, msg: "해당 유저가 좋아요 누른 음식들 리스트입니다.", result: foodData});
        }catch(err){
            console.error(err);
            return res.json({statusCode: CODE.FAIL, msg:"데이터베이스 오류"});
        }
    }
}

module.exports = user;