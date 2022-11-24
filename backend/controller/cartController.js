const Cart = require("../models/cart");
const CODE = require("../modules/statusCode");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

const cart = {
    get: async(req, res, err) => {
        try{
            const userid = req.query.userid;
            const totalCart = await Cart.findAll({
                where:{
                    userid: userid
                }
            }); 
            return res.json({msg:"해당 유저의 카트 정보입니다.", result: totalCart});
        }catch(error){
            console.error(error);
            return res.json({msg:"데이터베이스 오류입니다.", statusCode: CODE.FAIL });
        }
    },
    add: async(req, res, err) => {
        try{
            const userid = req.body.userid;
            const material = req.body.material;
            let addData = [];
            for(let i = 0 ; i< material.length; i++){
                await Cart.create({
                    materials: material[i],
                    userid: userid
                });
            }          
            const totalCart = await Cart.findAll({
                where:{
                    userid: userid
                }
            });       

            return res.json({msg:"유저의 카트정보를 생성했습니다.", statusCode: CODE.SUCCESS, result:totalCart})
        }catch(error){
            console.error(error);
            return res.json({msg:"데이터베이스 오류", statusCode: CODE.FAIL, result: 0});
        }
    },
    delete: async(req, res, err) => {
        try{
            const deleteIndex = req.query.index;
            const userid = req.query.userid;
            const del = await Cart.destroy({
                where:{
                    index: deleteIndex
                }
            });
            
            const totalCart = await Cart.findAll({
                where:{
                    userid: userid
                },order: [
                    ['createdAt', 'DESC'],
                    [Comment, 'createdAt', 'DESC']
                  ]
            });  
            if(!del){
                return res.json({msg:"삭제하고자 하는 식자재가 데이터베이스에 없습니다.", statusCode: CODE.SUCCESS, result: totalCart});
            }
            return res.json({msg:"데이터 삭제완료", statusCode: CODE.SUCCESS, result: totalCart });
        }catch(error){
            console.error(error);
            return res.json({msg: "데이터베이스 오류", statusCode: CODE.FAIL, result: 0});
        }
    }
  },
  add: async (req, res, err) => {
    try {
      const userid = req.body.userid;
      const material = req.body.material;
      let addData = [];
      console.log(material);
      console.log(material.length);
      for (let i = 0; i < material.length; i++) {
        await Cart.create({
          materials: material[i],
          userid: userid,
        });
      }
      const totalCart = await Cart.findAll({
        where: {
          userid: userid,
        },
      });

      return res.json({
        msg: "유저의 카트정보를 생성했습니다.",
        statusCode: CODE.SUCCESS,
        result: totalCart,
      });
    } catch (error) {
      console.error(error);
      return res.json({
        msg: "데이터베이스 오류",
        statusCode: CODE.FAIL,
        result: 0,
      });
    }
  },
  delete: async (req, res, err) => {
    try {
      const deleteIndex = req.query.index;
      const userid = req.query.userid;
      const del = await Cart.destroy({
        where: {
          index: deleteIndex,
        },
      });

      const totalCart = await Cart.findAll({
        where: {
          userid: userid,
        },
      });
      if (!del) {
        return res.json({
          msg: "삭제하고자 하는 식자재가 데이터베이스에 없습니다.",
          statusCode: CODE.SUCCESS,
          result: totalCart,
        });
      }
      return res.json({
        msg: "데이터 삭제완료",
        statusCode: CODE.SUCCESS,
        result: totalCart,
      });
    } catch (error) {
      console.error(error);
      return res.json({
        msg: "데이터베이스 오류",
        statusCode: CODE.FAIL,
        result: 0,
      });
    }
  },
};

module.exports = cart;
