var db = require('../db.js');

module.exports.login = function(req, res) {
    res.render('auth/login');
}

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({
        email: email
    }).value();
    if (!user) {
        res.render('auth/login', {
            errors: ['User does not exists']
        });
        return;
    }
    if (user.password !== password) {
        res.render('auth/login', {
            errors: ['Wrong password'],
            values: {
                email: email
            }
        });
        return;
    }
    res.cookie('userId', user.id);
    res.redirect('/users');
}