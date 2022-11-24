const express = require('express');
const router = express.Router();
const cart = require('../controller/cartController');

router.get('/', cart.get);
router.post('/', cart.add);
router.delete('/', cart.delete);

module.exports = router;