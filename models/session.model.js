var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
    sessionId: String,
    cart: [{
        productId: String,
        productName: String,
        productPrice: Number,
        productImage: String,
        count: Number
    }]
})

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;