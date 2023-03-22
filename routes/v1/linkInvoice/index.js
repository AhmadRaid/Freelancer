const express = require("express");

const controller = require("../../../app/controller/linkInvoice");

const isAuth = require("../../../middleware/isAuth");

const verifyIdentify = require("../../../middleware/verifyIdentify");

const checkAdminRole = require("../../../middleware/checkAdminRole");

const router = express.Router();

router.use(isAuth);

router.get("/listing", controller.getAllLinkInvoice);

router.post("/add", verifyIdentify ,controller.addLinkInvoice);

router.post("/change_status/:invoiceLinkId", checkAdminRole ,controller.checkAdminRole);

router.put("/edit/:linkInvoice", controller.editLinkInvoice);

router.delete("/delete/:linkInvoice", controller.deleteLinkInvoice);

module.exports = router;