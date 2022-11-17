const express = require('express');
const router = express.Router();
const check = require('../controller/checkController');

router.get('/idcheck', check.id);
router.get('/nickcheck', check.nickname);

module.exports = router;