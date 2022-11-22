const express = require('express');
const router = express.Router();
const ingredient = require('../controller/ingredientController');

router.get('/', ingredient.get);
router.post('/', ingredient.add);
router.delete('/', ingredient.delete);

module.exports = router;