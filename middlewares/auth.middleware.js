var db = require('../db.js');

module.exports.requireAuth = function(req, res, next) {

    var user = db.get('users').find({
        id: req.signedCookies.userId
    }).value();
    // Neu chua co Cookie se dan ve trang dang nhap
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    // Neu co cookie nhung khong chinh xac thi cung dan ve trang dang nhap
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}