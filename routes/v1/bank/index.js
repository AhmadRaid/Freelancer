const express = require('express');

const controller = require('../../../app/controller/Bank');
const isAuth = require('../../../middleware/isAuth');

const router = express.Router();
router.use(isAuth);

 router.get('/listing', controller.getAllBank);

 router.post('/add', controller.addBank);

// router.get('/show/:bankId', controller.showBank);

// router.put('/edit/:bankId', controller.editBank);

// router.delete('/delete/:bankId', controller.deleteBank);

module.exports = router;
