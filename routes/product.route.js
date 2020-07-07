var express = require('express');
var router = express.Router();

var controller = require('../controllers/product.controller.js');
var validateProduct = require('../validate/product.validate.js');

router.get('/', controller.index);
router.get('/create', controller.create);

router.post('/create', validateProduct.postCreate, controller.postCreate);



module.exports = router;