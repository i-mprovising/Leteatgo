const Recipe = require('../models/recipe');
const CODE = require('../modules/statusCode');
const Food = require('../models/food');
const Prefer = require("../models/prefer");


const recipe = {
    getRecipe: async(req, res) => {
        try{
            const findUser = await Prefer.findOne({
                where:{
                    userid: req.query.userid
                }
            });
            if(!findUser){
                const makeUser = await Prefer.create({
                    foodid: req.query.foodid,
                    userid: req.query.userid,
                    survey: 0
                });
            };
            const preferUser = await Prefer.increment(
                {view:1}, {where: {
                    userid : req.query.userid,
                    foodid : req.query.foodid
                }
                }
            );
            let recipeJson = {};
            let general = {};
            // foodid이용해서 Food table에서 material,foodname 가져오고
            const food = await Food.findOne({
                attributes: ['Name', 'material'],
                where: {
                    foodid : req.query.foodid
                }
            });
            if(food == null) {
                return res.json({statusCode: CODE.BAD_REQUEST, msg: "데이터베이스내에 음식이 없습니다."});
            }
            // recipe테이블에서는 material, order 넘겨주기
            const recipe = await Recipe.findOne({
                where: {
                    recipeid: req.query.foodid
                }
            });
            if(recipe == null){
                return res.json({statusCode: CODE.SUCCESS, recipe: [], msg: "찾는 음식의 레시피가 없습니다."});
            }
            const checkPrefer = await Prefer.findOne({
                attributes:['favorite', 'made'],
                row: true,
                where:{
                    userid : req.query.userid,
                    foodid: req.query.foodid
                }
            })

            general["foodname"] = food.Name;
            general["material"] = food.material;
            general["order"] = recipe.order;
            recipeJson["general"] = general;
            recipeJson["detail"] = recipe.material;
            recipeJson["user"] = checkPrefer.dataValues;
            return res.json({ statusCode: CODE.SUCCESS, recipe: recipeJson, msg: "레시피를 찾았습니다."});
        }catch(err){
            console.error(err);
            return res.json({statusCode: CODE.FAIL, msg:"데이터베이스 오류"});
        }
    }
};

module.exports = recipe;