const express = require("express");

const controller = require("../../../app/controller/linkInvoice");

const isAuth = require("../../../middleware/isAuth");

const verifyIdentify = require("../../../middleware/verifyIdentify");

const checkAdminRole = require("../../../middleware/checkAdminRole");

const checkClientRole = require("../../../middleware/checkClientRole");


const router = express.Router();

router.use(isAuth);

router.get("/listing", controller.getAllLinkInvoice);

router.post("/add" ,controller.addLinkInvoice);

router.put("/edit/:invoiceLinkId", controller.editLinkInvoice);

router.delete("/delete/:invoiceLinkId", controller.deleteLinkInvoice);

router.put("/Admin_Team_change_status/:invoiceLinkId", checkAdminRole ,controller.change_status);

router.put("/Client_change_status/:invoiceLinkId", checkClientRole , controller.payLinkInvoice);

router.post("/payLinkInvoice/:invoiceLinkId", controller.payLinkInvoice);



module.exports = router;