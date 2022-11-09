const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchController');


router.get('/keyword', searchController); 

module.exports = router;
