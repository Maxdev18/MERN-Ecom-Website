import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/products.css';

export const ProductsComp = (props) => {
    function searchItem(search, page) {
        props.searchQ.searchQuery(search, page);
    }

    return (
        <>
            <h1 className="products-title">Some Product Categories</h1>
            <div className="category-container">
                <div className="phones-category category">
                    <h2 className="category-title"><Link to={`/products?search=phone&page=1`} onClick={() => searchItem('phone', 1)}>Phones</Link></h2>
                </div>
                <div className="laptops-category category">
                    <h2 className="category-title"><Link to={`/products?search=surface&page=1`} onClick={() => searchItem('surface', 1)}>Surface Pros</Link></h2>
                </div>
            </div>
        </>
    )
};