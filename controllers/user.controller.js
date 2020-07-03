var db = require('../db.js');
var shortId = require('shortid');

module.exports.index = function(req, res) {
    console.log(res.locals.user);
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.search = function(req, res) {
    var q = req.query.q;
    var users = db.get('users').value();
    var matchesUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
    })
    res.render('users/index', {
        users: matchesUsers,
        qSearch: q
    })
}

module.exports.create = function(req, res) {
    res.render('users/create');
}

module.exports.getUser = function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value();
    res.render('users/view', {
        user: user
    });
}

module.exports.postCreate = function(req, res) {
    req.body.id = shortId();
    db.get('users').push(req.body).write();
    res.redirect('/users');
}