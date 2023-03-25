const express = require("express");

const controller = require("../../../app/controller/linkInvoice");

const isAuth = require("../../../middleware/isAuth");

const checkAdminRole = require("../../../middleware/checkAdminRole");

const checkClientRole = require("../../../middleware/checkClientRole");


const router = express.Router();

router.use(isAuth);

router.get("/listing", controller.getAllLinkInvoice);

router.post("/add" ,controller.addLinkInvoice);

router.put("/edit/:invoiceLinkId", controller.editLinkInvoice);

router.delete("/delete/:invoiceLinkId", controller.deleteLinkInvoice);

router.put("/Admin_Team_change_status/:invoiceLinkId", checkAdminRole ,controller.Admin_change_status);

router.put("/Client_change_status/:invoiceLinkId", checkClientRole , controller.Client_change_status);

router.put("/payLinkInvoice/:invoiceLinkId", controller.payLinkInvoice);



module.exports = router;