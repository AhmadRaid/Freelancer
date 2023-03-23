const express = require('express');
const isAuth = require('../../../middleware/isAuth');
const router = express.Router();
const controller = require('../../../app/controller/invoice');
const verifyIdentify = require('../../../middleware/verifyIdentify');

router.use(isAuth);

router.get('/', controller.getListing);

router.get('/:id', controller.getDetails);

router.post('/', controller.addInvoice);

router.put('/:id', controller.edit);

router.delete('/:id', controller.cancel);

module.exports = router;
