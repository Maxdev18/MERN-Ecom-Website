const Product = require('../models/products/products');
const Review = require('../models/reviews/reviews');

exports.postReviews = async (req, res, next) => {
    const id = req.params.id;
    const newReview = req.body;
    const productId = await Product.findById(id);

    //Create new review object
    const review = new Review({
        productId: id,
        name: newReview.name,
        description: newReview.description,
        headline: newReview.headline,
        rating: newReview.rating
    });

    //Save review data in product object
    productId.reviews.push(review);

    let allReviews = [];
    let averageRating = 0;

    for(let i = 0; i < productId.reviews.length; i++) {
        allReviews.push(productId.reviews[i].rating);
    }
    averageRating = allReviews.reduce((prev, cur) => prev + cur, 0) / productId.reviews.length;
    console.log(averageRating);
    productId.rating = averageRating.toFixed(1);


    await productId.save((err) => {
        if(err) {
            return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
              });
        }
    });
}