var Session = require('../models/session.model.js');
var Product = require('../models/product.model.js');

module.exports.index = async function(req, res) {
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.render("cart/index", {
            isEmpty: 1
        });
        return;
    }

    var session = await Session.findOne({
        sessionId: sessionId
    });

    var cart = session.cart;
    if (cart.length === 0) {
        res.render("cart/index", {
            isEmpty: 1
        });
        return;
    }
    res.render("cart/index", {
        isEmpty: 0,
        cart: cart,
        sum: cart.reduce(function(accu, curr) {
            return accu + curr.productPrice * curr.count
        }, 0)
    });
}

module.exports.addToCart = async function(req, res, next) {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    }

    var session = await Session.findOne({
        sessionId: sessionId
    });

    var cart = session.cart // cart : [ {productId: "...", count} ]
    var index = cart.findIndex(function(x) {
        return x.productId === productId;
    })

    if (index >= 0) {
        cart[index].count += 1;
    } else {
        var product = await Product.findById(productId);

        newItem = {
            productId: productId,
            productName: product.name,
            productPrice: product.price,
            productImage: product.image,
            count: 1
        }
        cart.push(newItem);
    }

    session.cart = cart;
    session.save(function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Add product to cart success!!!")
        }
    });

    res.redirect('/products');
}