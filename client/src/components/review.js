import * as React from 'react';
import Axios from 'axios';
import StarRatings from 'react-star-ratings';
import '../styles/productsPage/reviews.css';

export const ReviewComp = (props) => {

    //Get state for review ratings
    let [reviewData, setReviewData] = React.useState({
        headline: '',
        name:'',
        description: '',
        rating: 0
    })
    let [reviewSeen, setReviewSeen] = React.useState(false);

    const ReviewWrapper = () => {
        return (
            <div className="review-container">
                <div className="reviews-header">
                    <h2 className="review-title">Reviews</h2>
                    <div className="rating-container"> 
                        <StarRatings
                            size={20}
                            numberOfStars={5}
                            starRatedColor='#ffee00'
                            starDimension='30px'
                            starSpacing='2px'
                            rating={props.product.rating}
                            name="rating"/>
                        <p className='rating'>{Number(props.product.rating).toFixed(1)}</p>
                    </div>
                    <button className="write-review-link" onClick={togglePop}>Write a Review</button>
                </div>
            </div>
        )
    }

    //Write a review pop up component
    var id = props.product._id;
    console.log(id)

    //Post review
    const publishReview = (e) => {
        e.preventDefault();

        if(reviewData.rating === 0) {
            alert('Please select a rating');
        }
        togglePop();
        console.log(reviewData)
        Axios.post(`/api/reviews/postReviews/${id}`, reviewData);
    };

    //Change the rating
    const changeRating = (newRating, name) => {
        setReviewData({...reviewData, rating: newRating})
    };

    function togglePop() {
        if(reviewSeen === false) {
            return setReviewSeen(true);
        }
        return setReviewSeen(false);
    }

    return (
        <>
            <ReviewWrapper />
            {reviewSeen ? <div className="write-review-bg-container">
                <div className="write-review-main-container">
                    <div className="write-review-header">
                        <div className="close-header">
                            <h1 className="write-review-title">Write a Review</h1>
                            <li onClick={togglePop}><span className="close">&times;</span></li>
                        </div>
                        <div className="product-in-review-container">
                            <img src={props.product.imageURL} className="review-product-image"/>
                            <h3 className="product-name">{props.product.name}</h3>
                        </div>
                        <div className="overall-rating-container">
                            <h3 className="overall-rating-title">Your Rating</h3>
                            <StarRatings
                                size={20}
                                numberOfStars={5}
                                starHoverColor='#ffee00'
                                starRatedColor='#ffee00'
                                starDimension='30px'
                                starSpacing='2px'
                                isSelectable='true'
                                rating={reviewData.rating}
                                changeRating={changeRating}
                                name="rating"/>
                        </div>

                        <form className="review-data-container" method="POST" action="/api/reviews/postReviews">
                            <div className="data-container">
                                <div className="review-data">
                                    <h3 className="headline-title">Headline</h3>
                                    <input onChange={e => setReviewData({...reviewData, headline: e.target.value})} value={reviewData.headline} type="text" className="input headline-input" name="headline" placeholder="What’s most important ot know?"/>
                                </div>

                                <div className="review-data">
                                    <h3 className="public-name-title">Public Name</h3>
                                    <input onChange={e => setReviewData({...reviewData, name: e.target.value})} value={reviewData.name} type="text" className="input public-name-input" name="publicName" placeholder="Public name..."/>
                                </div>
                            </div>

                            <textarea onChange={e => setReviewData({...reviewData, description: e.target.value})}  value={reviewData.description} className="review-description" name="description" placeholder="Description..."/>
                            <div className="publish-btn-container">
                                <button className="publish-review-btn" type="submit" onClick={publishReview}>Publish</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> : null}
        </>
    )
};