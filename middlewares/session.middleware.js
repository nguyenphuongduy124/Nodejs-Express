var Session = require('../models/session.model.js');
var User = require('../models/user.model.js');

var shortid = require('shortid');

module.exports = async function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        var sessionId = shortid.generate();

        res.cookie('sessionId', sessionId, {
            signed: true
        });

        var doc = new Session({
            sessionId: sessionId
        });
        doc.save(function(err) {
            if (err) {
                console.log(err);
            }
        })
    }


    var userId = req.signedCookies.userId;
    if (userId) {
        var user = await User.findById(userId);
        res.locals.userLogin = user
    }


    var session = await Session.findOne({
        sessionId: sessionId
    });

    var cart = session.cart;
    if (cart.length === 0) {
        res.locals.totalCart = 0;
    } else {
        var total = 0;
        cart.reduce(function(accumulator, currentValue) {
            total = accumulator + currentValue.count;
            return total;
        }, 0);
        res.locals.totalCart = total;
    }

    next();

}