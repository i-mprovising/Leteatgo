const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


router.post('/signup',  userController.signup); 
router.post('/signin',  userController.signin);
router.get('/made', userController.made);
router.get('/like', userController.like);
router.put('/like/update', userController.updateLike); 
module.exports = router;
