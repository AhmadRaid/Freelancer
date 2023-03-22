const express = require("express");
//const routesVersioning = require("express-routes-versioning")();

const router = express.Router();

router.use("/auth", require("./v1/auth"));

router.use("/user", require("./v1/user"));

router.use("/bank", require("./v1/bank"));

router.use("/withdraw", require("./v1/withdraw"));

router.use("/recipient", require("./v1/recipients"));

router.use("/office", require("./v1/office"));

router.use("/linkInvoice", require("./v1/linkInvoice"));



module.exports = router;
