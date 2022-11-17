const express = require('express');
const router = express.Router();
const testController = require('../controller/testController');

router.get('/recommend/:userid',  testController.getrecom); 
module.exports = router;