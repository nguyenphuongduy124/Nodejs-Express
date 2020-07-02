var shortId = require('shortid');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
var db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({
        users: []
    })
    .write()

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
        extended: true
    })) // for parsing application/x-www-form-urlencoded

// set template engine
app.set('view engine', 'pug');
app.set('views', './views');

// get
app.get('', function(req, res) {
    res.render('index', {
        name: "CodersX"
    });
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
})

app.get('/users/search', function(req, res) {
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


app.get('/users/create', function(req, res) {
    res.render('users/create');
})

app.get('/users/:id', function(req, res) {
    var id = req.params.id;
    var user = db.get('users').find({
        id: id
    }).value();
    res.render('users/view', {
        user: user
    });
})

// post
app.post('/users/create', function(req, res) {
    req.body.id = shortId();
    db.get('users').push(req.body).write();
    res.redirect('/users');
})


app.listen(port, function() {
    console.log('Server running on port: ', port);
})