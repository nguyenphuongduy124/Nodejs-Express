var db = require('../db.js');
var shortid = require('shortid');
module.exports = function(req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        var sessionId = shortid.generate();

        res.cookie('sessionId', sessionId, {
            signed: true
        });

        db.get('sessions').push({
            id: sessionId
        }).write();
    }

    var cart = db.get('sessions').find({
        id: sessionId
    }).get('cart').value();

    var total = 0;
    if (cart) {
        for (var key in cart) {
            total += cart[key];
        }
    }
    res.locals.totalCart = total;


    next();

}