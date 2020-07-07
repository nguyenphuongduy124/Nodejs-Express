var express = require('express');


var router = express.Router();

var controller = require('../controllers/user.controller.js');
var validate = require('../validate/user.validate.js');

router.get('/', controller.index);

router.get('/search', controller.search);


router.get('/create', controller.create);

router.get('/delete/:id', controller.delete);

router.get('/:id', controller.getUser);

// post
router.post('/:id', validate.postCreate,
    controller.postCreate)

module.exports = router;