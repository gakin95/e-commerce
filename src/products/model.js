const mongoose = require('mongoose'),
    { Schema } = mongoose,

productSchema = new Schema({
    name: String,
    price: Number,
    currency: String,
    picture: String,
    size: String,
}, { timestamps: true });

const Products = mongoose.model('Products', productSchema);
exports.Products = Products;
