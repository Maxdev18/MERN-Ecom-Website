const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Initialize Product Schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    reviews: [],
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;