import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchBar from '../photos/search-icon.png';
import '../styles/components/nav.css'; 

export const Nav = (props) => {
    // Login Object
    const ifLoggedIn = {
        checkLogin: () => {
            if(props.isLoggedIn) {
                return (
                    <button className="login" href="/login">Logout</button>
                )
            } else {
                return (
                    <button className="login" href="/login">Login</button>
                )
            }
        }
    };

    // Declare states
    let [cart, setCart] = useState(0);
    let [search, setSearch] = useState("");

    return (
            <nav className="nav-container">
                <h1 className="logo" href="/">MERN Stack</h1>
                <div className="links-container">
                    <a href="/products">Products</a>
                    <a href="/about">About</a>
                    <a href="/faq">FAQ</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="nav-sub-container">
                    <div className="searchbar-container">
                        <form method="POST" action={"/" + search} className="form-container">
                            <input className="search-bar" placeholder="search..." onChange={(value) => setSearch(value)} />
                            <Link to="/products"><img src={searchBar} /></Link>
                        </form>
                    </div>
                    <div className="login-container">
                        {ifLoggedIn.checkLogin()}
                    </div>

                    <div className="cart-container">
                        <Link to="/cart/user:id"><h4 className="cart">Cart: {cart}</h4></Link>
                    </div>
                </div>
            </nav>
    );
}