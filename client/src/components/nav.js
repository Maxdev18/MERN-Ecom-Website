import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import searchBar from '../photos/search-icon.png';
import '../styles/components/nav.css';
import { UserContext } from '../Contexts/UserContext';

const Axios = require('axios');

export const Nav = (props) => {
    const {user, setUser} = useContext(UserContext);
    const [ cartItems, setCartItems ] = React.useState([...props.cartItems]);

    // Login Object
    const ifLoggedIn = {
        checkLogin: () => {
            if(user) {
                return (
                    <Link to="/login">
                        <button className="btn-login" onClick={ async () => {
                            //Request logout to server
                            await Axios.get('/auth/logout');
                            
                            localStorage.clear();
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
                        <form method="POST" action={"/"} className="form-container"> {/* + search*/}
                            <input className="search-bar" placeholder="search..." /> {/* onChange={(value) => setSearch(value)} */}
                            <Link to="/products"><img src={searchBar} /></Link>
                        </form>
                    </div>
                    <div className="login-container">
                        {ifLoggedIn.checkLogin()}
                    </div>

                    <div className="cart-container">
                        <Link to="/cart/user/:id"><h4 className="cart">Cart: {cartItems.length}</h4></Link>
                    </div>
                </div>
            </nav>
    );
}