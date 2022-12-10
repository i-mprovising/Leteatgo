const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/made", userController.getMade);
router.get("/like", userController.getLike);
router.put("/made/update", userController.updateMade);
router.put("/like/update", userController.updateLike);
router.delete("/withdraw", userController.delete);
module.exports = router;
