var shortId = require('shortid');

var express = require('express');
var router = express.Router();
var db = require('../db.js');

router.get('/', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
})

router.get('/search', function(req, res) {
    console.log(req.query);
    var q = req.query.q;
    var users = db.get('users').value();
    var matchesUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
    })
    res.render('users/index', {
        users: matchesUsers,
        qSearch: q
    })
})


router.get('/create', function(req, res) {
    res.render('users/create');
})

router.get('/:id', function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value();
    res.render('users/view', {
        user: user
    });
})

// post
router.post('/create', function(req, res) {
    req.body.id = shortId();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})

module.exports = router;