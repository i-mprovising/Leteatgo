const User = require('../models/user');
const bcrypt = require('bcrypt');
const CODE = require('../modules/statusCode');

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
        }
}

module.exports = user;