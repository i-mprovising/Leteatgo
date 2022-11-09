const Food = require('../models/food');
const CODE = require('../modules/statusCode');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const search = async (req, res, next) => {
    try{
        const searchWord = req.query.key;
        const keylist = searchWord.split(" ");
        let result = [];
        for (i of keylist){
            if(i){
            const found = await Food.findAll({
                attributes: ['Name', 'Image', 'foodid'],
                where: {
                    Name: {[Op.like]: '%' + i +'%'}
                }
            });
                for(item of found){
                    result.push(item);
                }
            }
        }
        console.log(result.length);
        return res.json({ statusCode: CODE.SUCCESS, msg: "search successfully", result: result});
    }
    catch(error){
        console.error(error);
        return res.json({ statusCode: CODE.SERVER_ERROR, msg: "server error"});
    }
}

module.exports = search;