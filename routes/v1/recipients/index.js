const express = require("express");

const controller = require("../../../app/controller/Recipients");
const isAuth = require("../../../middleware/isAuth");

const router = express.Router();
router.use(isAuth);

router.get("/listing", controller.getAllRecipient);

router.post("/add", controller.addRecipient);

//router.put("/edit/:recipientId", controller.editRecipient);

//router.delete("/delete/:recipientId", controller.deleteRecipient);

router.post("/sendCode", controller.sendCode);

module.exports = router;
