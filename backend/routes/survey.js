const express = require("express");
const router = express.Router();
require("dotenv").config();
const surveyController = require("../controller/surveyController");

router.get("/", surveyController.taste);
router.post("/save", surveyController.save);

module.exports = router;
