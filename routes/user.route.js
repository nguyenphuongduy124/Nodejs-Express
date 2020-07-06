var express = require('express');
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

var router = express.Router();

var controller = require('../controllers/user.controller.js');
var validate = require('../validate/user.validate.js');

router.get('/', controller.index);

router.get('/search', controller.search);


router.get('/create', controller.create);

router.get('/delete/:id', controller.delete);

router.get('/:id', controller.getUser);

// post
router.post('/:id', upload.single('avatar'), validate.postCreate,
    controller.postCreate)

module.exports = router;