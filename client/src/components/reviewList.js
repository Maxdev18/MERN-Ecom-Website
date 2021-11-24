import * as React from 'react';
import StarRatings from 'react-star-ratings';

export const ReviewListComp = (props) => {
    //Get review array from product object
    let [reviews, setReviews ] = React.useState([]);

    React.useEffect(() => {
        setReviews(props.productData.product.reviews);
    }, []);

    return(
        <>
            {reviews ? reviews.map(review => {
                return(
                    <div className="user-review-container" key={review._Id ? review._Id : Math.ceil(Math.random() * 1000)}>
                        <div className="user-review-header">
                            <h2 className="user-review-name">{review.name}</h2>
                            <div className="user-rating-container">
                                <StarRatings
                                    size={20}
                                    numberOfStars={5}
                                    starRatedColor='#ffee00'
                                    starDimension='30px'
                                    starSpacing='2px'
                                    rating={review.rating}
                                    name="rating"/>
                                <h3 className="user-headline">{review.headline}</h3>
                            </div>
                            <p className="user-review-date">Reviewed on {review.date}</p>
                        </div>
                        <p className="user-description">{review.description}</p>
                    </div>
                )
            }) : null}
        </>
    );
};
