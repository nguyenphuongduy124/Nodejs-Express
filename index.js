var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

var usersRoute = require('./routes/user.route.js');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
        extended: true
    })) // for parsing application/x-www-form-urlencoded

// set template engine
app.set('view engine', 'pug');
app.set('views', './views');

// static files
app.use(express.static('public'));

// get
app.get('/', function(req, res) {
    res.render('index', {
        name: "CodersX"
    });
})

app.use('/users', usersRoute);


app.listen(port, function() {
    console.log('Server running on port: ', port);
})