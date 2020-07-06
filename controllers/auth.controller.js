var md5 = require('md5');

var User = require('../models/user.model.js');

module.exports.login = function(req, res) {
    res.render('auth/login');
}

module.exports.postLogin = async function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = await User.findOne({
        email: email
    }, function(err, data) {
        console.log(data)
    });
    if (!user) {
        res.render('auth/login', {
            errors: ['User does not exists']
        });
        return;
    }


    var hashesPassword = md5(password);
    if (user.password !== hashesPassword) {
        res.render('auth/login', {
            errors: ['Wrong password'],
            values: {
                email: email
            }
        });
        return;
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');
}