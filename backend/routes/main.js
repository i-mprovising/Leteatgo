const express = require('express');
const router = express.Router();
const main = require('../controller/mainController');

router.get('/', main.itemMf);


module.exports = router;