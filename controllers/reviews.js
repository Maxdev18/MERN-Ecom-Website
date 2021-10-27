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
    await productId.save((err, data) => {
        if(err) {
            return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
              });
        }

        res.status(200).json({
            success: true,
            message: `Your review has been added successfully and will appear when approved!`,
            review: data
          });
    });
}