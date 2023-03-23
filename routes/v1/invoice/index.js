const express = require('express');
const isAuth = require('../../../middleware/isAuth');
const router = express.Router();
const controller = require('../../../app/controller/invoice');
router.use(isAuth);
router.use(); //need

// [validationSchema , validateRequest] need to be add from my code out;

router.get('/', controller.getListing);
router.get('/:id', controller.getDetails);

router.post('/', controller.addInvoice);

router.put('/:id', controller.edit);

router.delete('/:id', controller.cancel);

module.exports = router;
