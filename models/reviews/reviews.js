const mongoose = require('mongoose');
const { Schema } = mongoose;

//Review schema template
const reviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    productId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    headline: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;