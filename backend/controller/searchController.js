const Food = require("../models/food");
const CODE = require("../modules/statusCode");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const search = async (req, res, next) => {
    try{
        const searchWord = req.query.key;
        let result = [];
        const findFood = await Food.findOne({
            attributes:['Name', 'Image', 'foodid'],
            row:true,
            where:{
                Name: searchWord
            }
        });
        if(findFood) result.push(findFood.dataValues);
        console.log(result);
        const keylist = searchWord.split(' ');
        for (i of keylist){
            console.log(i);
            if(i){
            const found = await Food.findAll({
                attributes: ['Name', 'Image', 'foodid'],
                row:true,
                where: {
                    Name: {[Op.like]: '%' + i +'%'}   
                }
            });
            for(item of found){
                console.log(item.dataValues);
                if(result.indexOf(item.dataValues) === -1) result.push(item.dataValues);
            }
            
        }
      }
    }
<<<<<<< HEAD
        let deleteDup = result.filter(function(item1, idx1){
            return result.findIndex(function(item2, idx2){
                return item1.foodid == item2.foodid
            }) == idx1;
        });
        console.log(deleteDup.length);
        return res.json({ statusCode: CODE.SUCCESS, msg: "search successfully", result: deleteDup});
    }
    catch(error){
        console.error(error);
        return res.json({ statusCode: CODE.SERVER_ERROR, msg: "server error"});
    }
}
=======
    let deleteDup = result.filter(function (item1, idx1) {
      return (
        result.findIndex(function (item2, idx2) {
          return item1.foodid == item2.foodid;
        }) == idx1
      );
    });
    console.log(deleteDup.length);
    return res.json({
      statusCode: CODE.SUCCESS,
      msg: "search successfully",
      result: deleteDup,
    });
  } catch (error) {
    console.error(error);
    return res.json({ statusCode: CODE.SERVER_ERROR, msg: "server error" });
  }
};
>>>>>>> 4d7e999867c1f1b0ba99a757214b1c66e9014c9b

module.exports = search;
