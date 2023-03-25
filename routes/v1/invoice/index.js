const express = require('express');
const isAuth = require('../../../middleware/isAuth');
const router = express.Router();
const controller = require('../../../app/controller/invoice');
const verifyIdentify = require('../../../middleware/verifyIdentify');

router.use(isAuth);

router.get('/', controller.getListing);

router.get('/getAllInvoiceLinkInvoice', controller.getAllInvoiceLinkInvoice);

router.get('/:id', controller.getDetails);
// TODO: add validation for what's coming in
router.post('/', controller.addInvoice);

router.put('/:id', controller.edit);

router.delete('/:id', controller.delete);

module.exports = router;
