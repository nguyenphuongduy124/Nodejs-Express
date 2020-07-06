var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        //fieldname; originalname; mimetype
        var time = Date.now();
        var arrOriginalName = file.originalname.split('.');
        var name = arrOriginalName.slice(0, arrOriginalName.length - 1).join('.');
        var ext = arrOriginalName[arrOriginalName.length - 1];
        var fileName = name + '-' + time + '.' + ext;
        cb(null, fileName);
    }
});
var upload = multer({
    storage: storage
});

var controller = require('../controllers/product.controller.js');
var validateProduct = require('../validate/product.validate.js');

router.get('/', controller.index);
router.get('/create', controller.create);

router.post('/create', upload.single('product-image'), validateProduct.postCreate,


    controller.postCreate);



module.exports = router;