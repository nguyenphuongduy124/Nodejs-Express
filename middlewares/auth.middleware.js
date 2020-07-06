var User = require('../models/user.model.js');

module.exports.requireAuth = async function(req, res, next) {

    var userId = req.signedCookies.userId;


    // Neu chua co Cookie se dan ve trang dang nhap
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }

    var user = await User.findById(userId);


    // Neu co cookie nhung khong chinh xac thi cung dan ve trang dang nhap
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.userLogin = user;

    next();
}