import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/nav.css';
import { UserContext, CartContext } from '../Contexts/UserContext';

const Axios = require('axios');

export const Nav = (props) => {
    const { user, setUser } = useContext(UserContext);
    const { cartItems, setCartItems } = useContext(CartContext);
    const [ totalCart, setTotalCart ] = React.useState(0);
    const [ search, setSearch ] = React.useState("");
    const { currentPage, setCurrentPage } = props.queryString;

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

    function searchItem() {
        props.searchQ.searchQuery(search, currentPage);
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
                        <Link to={search !== '' ? `/products?search=${search}&page=${currentPage}` : '/'} className="search-link" onClick={searchItem}>
                            <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTc0LjUzMzMzLDE3LjJjLTMxLjU5NjQyLDAgLTU3LjMzMzMzLDI1LjczNjkyIC01Ny4zMzMzMyw1Ny4zMzMzM2MwLDMxLjU5NjQyIDI1LjczNjkyLDU3LjMzMzMzIDU3LjMzMzMzLDU3LjMzMzMzYzEzLjczOTk4LDAgMjYuMzU4MzQsLTQuODc5MTUgMzYuMjQ3NjYsLTEyLjk3ODM5bDM0LjIzMjAzLDM0LjIzMjAzYzEuNDM4MDIsMS40OTc3OCAzLjU3MzQsMi4xMDExMyA1LjU4MjYsMS41NzczNWMyLjAwOTIsLTAuNTIzNzggMy41NzgyNiwtMi4wOTI4NCA0LjEwMjA0LC00LjEwMjA0YzAuNTIzNzgsLTIuMDA5MiAtMC4wNzk1NywtNC4xNDQ1OCAtMS41NzczNSwtNS41ODI2bC0zNC4yMzIwMywtMzQuMjMyMDNjOC4wOTkyNCwtOS44ODkzMiAxMi45NzgzOSwtMjIuNTA3NjggMTIuOTc4MzksLTM2LjI0NzY2YzAsLTMxLjU5NjQyIC0yNS43MzY5MiwtNTcuMzMzMzMgLTU3LjMzMzMzLC01Ny4zMzMzM3pNNzQuNTMzMzMsMjguNjY2NjdjMjUuMzk5MzcsMCA0NS44NjY2NywyMC40NjczIDQ1Ljg2NjY3LDQ1Ljg2NjY3YzAsMjUuMzk5MzcgLTIwLjQ2NzI5LDQ1Ljg2NjY3IC00NS44NjY2Nyw0NS44NjY2N2MtMjUuMzk5MzcsMCAtNDUuODY2NjcsLTIwLjQ2NzI5IC00NS44NjY2NywtNDUuODY2NjdjMCwtMjUuMzk5MzcgMjAuNDY3MywtNDUuODY2NjcgNDUuODY2NjcsLTQ1Ljg2NjY3eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>
                        </Link>
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