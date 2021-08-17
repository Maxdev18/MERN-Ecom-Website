import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/products.css';

export const ProductsComp = () => {
    return (
        <>
            <h1 className="products-title">Some Product Categories</h1>
            <div className="category-container">
                <div className="phones-category category">
                    <h2 className="category-title"><Link to="/products/phones">Phones</Link></h2>
                </div>
                <div className="laptops-category category">
                    <h2 className="category-title"><Link to="/products/laptops">Laptops</Link></h2>
                </div>
            </div>
        </>
    )
};