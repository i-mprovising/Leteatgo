const express = require('express');
const router = express.Router();
const recommend = require('../controller/recommendController');

router.get('/best', recommend.best );


module.exports = router;