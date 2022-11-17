const express = require('express');
const router = express.Router();
const recipe= require('../controller/recipeController');

router.get('/recipe', recipe.getRecipe);

module.exports = router;