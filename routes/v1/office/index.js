const express = require("express");

const controller = require("../../../app/controller/Office");
const isAuth = require("../../../middleware/isAuth");

const router = express.Router();
router.use(isAuth);

router.get("/listing", controller.getAllOffice);

router.post("/add", controller.addOffice);

module.exports = router;
