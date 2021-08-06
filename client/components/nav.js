import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/homepage';

export const Nav = () => {
    // Declare states
    let [cart, setCart] = useState(0);
    let [search, setSearch] = useState("");


    return (
            <nav className="nav-container">
                <h1 className="logo" href="/">Camp Land</h1>
                <div className="links-container">
                    <a href="/products">Products</a>
                    <a href="/about">About</a>
                    <a href="/faq">FAQ</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="searchbar-container">
                    <form method="POST" action={"/" + search}>
                        <input className="search-bar" placeholder="search..." onChange={(value) => setSearch(value)} />
                        <button type="submit" onClick={  } className="search-btn">Search</button>
                    </form>
                </div>
                <div className="login-container">
                    <h3 className="login" href="/login">Login</h3>
                </div>
                <div className="cart-container">
                    <h4 className="cart" href="/cart/:id">Cart: {cart}</h4>
                </div>
            </nav>
    );
}