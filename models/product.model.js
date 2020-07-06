var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String
})

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;