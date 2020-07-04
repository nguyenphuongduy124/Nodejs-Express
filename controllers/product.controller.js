var db = require('../db.js');

module.exports.index = function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var itemsPerPage = 8;

    var products = db.get('products').drop((page - 1) * itemsPerPage).take(itemsPerPage).value();
    var totalPage = Math.ceil(db.get('products').value().length / itemsPerPage);

    // Check page greatter totalPage
    if (page > totalPage) page = totalPage;
    if (page < 1) page = 1;
    var pagination = [page];

    for (var i = 1; i < 3; i++) {
        if (page + i <= totalPage) {
            pagination.push(page + i);
        }
        if (page - i >= 1) {
            pagination.unshift(page - i);
        }
    }
    console.log(pagination)

    res.render('products/index', {
        products: products,
        totalPage: totalPage,
        currentPage: page,
        nextPage: page + 1,
        prevPage: page - 1,
        pagination: pagination
    });
}