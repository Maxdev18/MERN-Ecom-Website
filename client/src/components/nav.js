import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchBar from '../photos/search-icon.png';
import '../styles/components/nav.css';
import { UserContext, CartContext } from '../Contexts/UserContext';
import axios from 'axios';

const Axios = require('axios');

export const Nav = () => {
    const { user, setUser } = useContext(UserContext);
    const { cartItems, setCartItems } = useContext(CartContext);
    const [ totalCart, setTotalCart ] = React.useState(0);
    const [ search, setSearch ] = React.useState("");
    const [ pages, setPages ] = React.useState(0);
    const [ products, setProducts ] = React.useState([]);

    // Login Object
    const ifLoggedIn = {
        checkLogin: () => {
            if(user) {
                return (
                    <Link to="/login">
                        <button className="btn-login" onClick={ async () => {
                            //Request logout to server
                            await Axios.get('/auth/logout');
                            
                            setUser(null);
                            setCartItems([]);
                            }}>Logout</button>
                    </Link>
                )
            } else {
                return (
                    <a className="btn-login" href="/login">Login</a>
                )
            }
        }
    };

    let total = 0;
    useEffect(() => {
        //Calculate total cart items
        if(cartItems) {
            for (let i = 0; i < cartItems.length; i++) {
                total += cartItems[i].quantity;
            }
            setTotalCart(total);
        }
    }, [cartItems]);

    // Search item function
    async function searchItem() {
        const response = await fetch(`/products?search=${search}&page=${pages}`)
            .then(({ totalPages, filteredResults }) => {
                setProducts(filteredResults);
                setPages(totalPages);
            });

        console.log(response);
        console.log(products);  
        console.log("Pages: " + pages);
    }

    return (
            <nav className="nav-container">
                <a className="logo" href="/">MERN Stack</a>
                <div className="links-container">
                    <a href="/products">Products</a>
                    <a href="/about">About</a>
                    <a href="/faq">FAQ</a>
                    <a href="/contact">Contact</a>
                </div>
                <div className="nav-sub-container">
                    <div className="searchbar-container">
                        <input value={search} className="search-bar" placeholder="search..." onChange={e => setSearch(e.currentTarget.value)}/> 
                        <Link to={`/products?search=${search}&page=${pages}`}><img src={searchBar} onClick={searchItem}/></Link>
                    </div>
                    <div className="login-container">
                        {ifLoggedIn.checkLogin()}
                    </div>

                    <div className="cart-container">
                        <Link to="/cart/user/:id"><h4 className="cart">Cart: {totalCart}</h4></Link>
                    </div>
                </div>
            </nav>
    );
}