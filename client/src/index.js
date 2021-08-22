// Imports 
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Home } from './components/homeBody';
import { Nav } from './components/nav';
import { Footer } from './components/footer';
import { About } from './components/about';
import { Login } from './components/login';
import { Register } from './components/register';
import { ForgotPassword } from './components/forgotPW';

const App = () => {
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="container">
                <Nav isLoggedIn={ isLoggedIn }/>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/forgot-password" component={ForgotPassword}/>
                <Footer />
            </div>
        </Router>
    )
}

// Render components
ReactDOM.render(<App/>, document.getElementById('root'));