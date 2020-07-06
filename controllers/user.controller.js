var User = require('../models/user.model.js');

var shortId = require('shortid');
var md5 = require('md5');

module.exports.index = async function(req, res) {
    var users = await User.find();
    res.render('users/index', {
        users: users
    });
}

module.exports.search = async function(req, res) {
    var q = req.query.q;
    var users = await User.find();
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

module.exports.getUser = async function(req, res) {
    var id = req.params.id;
    var user = await User.findById(id);
    if (!user) {
        res.send('User does not exists!');
        return;
    }
    res.render('users/view', {
        user: user
    });
}

module.exports.postCreate = async function(req, res) {
    var path = req.path.slice(1); // path = create || id: "..."
    var pathImage = process.env.DEFAULT_IMAGE;
    if (req.file) {
        var destination = req.file.destination.split('/').slice(1).join('');
        var fileName = req.file.filename;
        pathImage = destination + "/" + fileName;
    }
    if (path === 'create') {

        req.body.avatar = pathImage;
        req.body.password = md5(req.body.password);

        var doc = new User(req.body);
        doc.save(function(err) {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('Add new user success!');
                return
            }
        });
    } else {
        var user = await User.findById(path);

        if (!user) {
            res.send('User does not exists!!!');
            return
        }

        if (pathImage === process.env.DEFAULT_IMAGE) {
            pathImage = user.avatar;
        }

        req.body.avatar = pathImage;
        if (!user.avatar) {
            req.body.avatar = process.env.DEFAULT_IMAGE;
        }

        if (req.body.password !== user.password) {
            req.body.password = md5(req.body.password);
        }

        User.findByIdAndUpdate(user.id, req.body, function(err) {
            if (err) {
                console.log("Update user failed");
            } else {
                console.log("Update user successed");
            }
        })
    }





    res.redirect('/users');
}

module.exports.delete = function(req, res) {
    var userId = req.params.id;
    User.findByIdAndDelete(userId, function(err) {
        if (err) {
            console.log(err);
            res.redirect('/users');
            return;
        } else {
            console.log('Delete document success!');
            res.redirect('/users');
            return;
        }
    })
}