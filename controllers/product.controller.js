// var db = require('../db.js');
var Product = require('../models/product.model.js');

module.exports.index = async function(req, res) {
    var page = parseInt(req.query.page) || 1;
    var itemsPerPage = 4;
    var start = (page - 1) * itemsPerPage;
    var end = page * itemsPerPage;

    var products = await Product.find();
    var totalPage = Math.ceil(products.length / itemsPerPage);
    var limitProducts = products.slice(start, end);

    // // Check page greatter totalPage
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

    res.render('products/index', {
        products: limitProducts,
        totalPage: totalPage,
        currentPage: page,
        nextPage: page + 1,
        prevPage: page - 1,
        pagination: pagination
    });
}

module.exports.create = function(req, res) {
    res.render('products/create');
}

module.exports.postCreate = function(req, res) {
    var newProduct = req.body;
    var image = newProduct.image ? newProduct.image : process.env.DEFAULT_IMAGE;
    newProduct.image = image;
    var doc = new Product(newProduct);
    doc.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Add new product success!!!');
        }
        res.redirect('/products');
    });
}