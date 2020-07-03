var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();
var port = 3000;

var usersRoute = require('./routes/user.route.js');
var authRoute = require('./routes/auth.route.js');

// middle authentication
var authMiddleware = require('./middlewares/auth.middleware.js');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
        extended: true
    })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());

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

app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/auth', authRoute);


app.listen(port, function() {
    console.log('Server running on port: ', port);
})