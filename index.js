var express = require('express');
var app = express();
var port = 3000;

// set template engine
app.set('view engine', 'pug');
app.set('views', './views');


var users = [{
    name: 'Duy',
}, {
    name: 'Thuy',
}];

// get
app.get('', function(req, res) {
    res.render('index', {
        name: "CodersX"
    });
})

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    });
})

app.get('/users/search', function(req, res) {
    console.log(req.query);
    var q = req.query.q;
    var matchesUsers = users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
    })
    res.render('users/index', {
        users: matchesUsers,
        qSearch: q
    })
})


app.listen(port, function() {
    console.log('Server running on port: ', port);
})