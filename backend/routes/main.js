const express = require('express');
const router = express.Router();
const main = require('../controller/mainController');

router.get('/', main.main);


module.exports = router;