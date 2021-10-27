import * as React from 'react';
import Axios from 'axios';
import { ReviewComp } from '../components/review';
import StarRatings from 'react-star-ratings';
import '../styles/productsPage/productPage.css';

export const ProductPage = (props) => {
    //Set product state
    let [product, setProduct] = React.useState([]);

    //Get product ID from the URL
    var id = props.match.params.id;

    // //Get product data from the back-end
    React.useEffect(() => {
        async function getProduct() {
            let res = await Axios.get(`/api/products/${id}`)
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err)
            });
        console.log(res.data);
        setProduct(res.data);
        }
        getProduct();
    }, []);

    //Add to cart
    const addToCart = () => {

    }

    return(
        <div className="page-container">
            <div className="main-product-container">
                <div className="product-container">
                    <img alt={product.name} src={product.imageURL} className="product-image"/>
                    <div className="description-container">
                        <div className="product-desciption-container">
                            <h1 className="product-title">{product.name}</h1>
                            <h3 className="desc">{product.description}</h3>
                            <div className="rating-container"> 
                                <StarRatings
                                    size={20}
                                    numberOfStars={5}
                                    starRatedColor='#ffee00'
                                    starDimension='30px'
                                    starSpacing='2px'
                                    rating={product.rating}
                                    name="rating"/>
                                <p className='rating'>{Number(product.rating).toFixed(1)}</p>
                            </div>
                            
                            <p className="description">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                                when an unknown printer took a galley of type and scrambled it to 
                                make a type specimen book. It has survived not only five centuries, 
                                but also the leap into electronic typesetting, remaining essentially 
                                unchanged. It was popularised in the 1960s with the release of Letraset 
                                sheets containing Lorem Ipsum passages, and more recently with desktop 
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum
                            </p>
                            <h2 className="price">${Number(product.price).toFixed(2)}</h2>
                            <p className="product-stock">{product.countInStock} left in stock</p>
                            <div className="button-container">
                                <a className="buy-btn btn" href="/api/buy">Buy Now</a>
                                <a className="add-to-cart-btn btn" href="/api/add-to-cart" onClick={addToCart}>Add To Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewComp product={product} />
        </div>
    );
};