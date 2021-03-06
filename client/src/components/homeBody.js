import React from 'react';
import '../styles/homepage/home.css';
import { ProductsComp } from '../components/homeContent';

export const Home = (props) => {
    return (
        <div className="main-container">
            <div className="home-container">
                <div className="home-sub-container">
                    <div className="title-container">
                        <h2 className="title header-text">New Tech Developments</h2>
                        <p className="title-description header-text">Where new technologies and breakthroughs are sold</p>
                    </div>

                    <div className="shop-container">
                        <div className="descriptions-container">
                            <h3 className="shop-description header-text">Find what you need here</h3>
                        </div>
                    
                        <div className="shop-btns-container">
                            <a href="/products" className="btn-shop">Shop here</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home-products-container">

                 <ProductsComp searchQ={props.searchQ}/>

            </div>
        </div>
    )
};
