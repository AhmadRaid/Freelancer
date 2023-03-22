const express = require("express");

const controller = require("../../../app/controller/withdraw");
const isAuth = require("../../../middleware/isAuth");
const router = express.Router();

router.use(isAuth);

router.get("/listing", controller.getAllWithdraw);

router.post("/add", controller.addWithdraw);

router.get("/show/:withdrawId", controller.getWithdrawDetails);

module.exports = router;
