module.exports.postCreate = function(req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push('Product name is required!');
    }
    if (!req.body.description) {
        errors.push('Product description is required!');
    }
    if (!req.body.price) {
        errors.push('Product price is required!');
    }
    if (!req.file.fieldname) {
        errors.push('Product image is required!');
    }

    // If has errors response error for user, dont run next()
    if (errors.length) {
        res.render('products/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    // if no has errors next() will run
    next();
}