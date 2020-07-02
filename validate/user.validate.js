module.exports.postCreate = function(req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is required!');
    }
    if (!req.body.phone) {
        errors.push('Phone is required!');
    }
    // If has errors response error for user, dont run next()
    if (errors.length) {
        res.render('users/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    // if no has errors next() will run
    next();
}