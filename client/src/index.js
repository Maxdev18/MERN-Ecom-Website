// Imports 
import React from 'react';
import { useState, useEffect } from 'react';
import { UserContext, CartContext } from './Contexts/UserContext';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Home } from './components/homeBody';
import { Nav } from './components/nav';
import { Footer } from './components/footer';
import { About } from './components/about';
import { Login } from './components/login';
import { Register } from './components/register';
import { ForgotPassword } from './components/forgotPW';
import { Contact } from './components/contact';
import { ProductsPage } from './components/productsPage';
import { ProductPage } from './components/productPage';

const App = () => {
    //Declare state variables
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [user, setUser] = useState(null);
    const [ totalPages, setTotalPages ] = React.useState(0);
    const [ products, setProducts ] = React.useState([]);
    const [ currentPage, setCurrentPage ] = React.useState(1);

    //Authenticates the user on every subsequent request
    useEffect( () => {
        //Retrieves token from the back-end then
        //validates in the front-end
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get('search');
        if(search !== '') {
            searchQuery(search, currentPage);
        }
        async function retrieveData() {
            let token = await axios.get('/auth/checkauth');
            let userData = token.data.user;
            if(userData) {
                setUser(userData);
                setIsLoggedIn(true);

                await axios.get(`/api/get-cart/${userData._id}`)
                    .then(data => {
                        setCartItems(data.data.products);
                    });
            } else {
                setCartItems([]);
                setIsLoggedIn(false);
            }
        }
        retrieveData();
    }, []);

    const onAdd = async () => {
        //Version 2 Using REST API
        await axios.get(`/api/get-cart/${user._id}`)
            .then(data => {
                return setCartItems(data.data.products);
            });
    }

    const [cartItems, setCartItems] = useState([]);
    
    const onRemove = (product) => {
        const id = (element) => element.id === product.id;
        const index = cartItems.findIndex(id);
        cartItems.splice(index, 1);
        setCartItems([...cartItems]);
        console.log(cartItems);
    };

    //Search Item Function
    async function searchQuery(search, currentPage) {
        if(search) {
            await axios.get(`/api/products?search=${search}&page=${currentPage}`)
            .then((res) => {
                const response = res.data;
                setProducts(response.filteredResults);
                setTotalPages(response.totalPages);
                setCurrentPage(currentPage);
            });
        }
        return null;
      };

    return (
        <Router>
            <UserContext.Provider value={{user, setUser}}>
            <CartContext.Provider value={{cartItems, setCartItems, onAdd}} >
                <div className="container">
                    <Nav isLoggedIn={ isLoggedIn } countCartItems={cartItems.length} cartItems={cartItems} searchQ={{searchQuery}} queryString={{currentPage, setCurrentPage}}/>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                    <Route exact path="/products" render={(props) => (
                        <ProductsPage {...props} searchResults={{products, setProducts, totalPages, setTotalPages}} searchQ={{searchQuery}}/>)} />
                    <Route exact path="/products/:id" component={ProductPage}/>
                    <Footer />
                </div>
            </CartContext.Provider>
            </UserContext.Provider>
        </Router>
    )
}

// Render components
ReactDOM.render(<App/>, document.getElementById('root'));