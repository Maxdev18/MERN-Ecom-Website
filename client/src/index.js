// Imports 
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Home } from './components/homeBody';
import { Nav } from './components/nav';
import { Footer } from './components/footer';

const App = () => {
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="container">
                <Nav isLoggedIn={ isLoggedIn }/>
                <Route exact path="/" component={Home} />
                {/* <Route path="/login" component={Login} />
                <Route />
                <Route /> */}
                <Footer />
            </div>
        </Router>
    )
}

// Render components
ReactDOM.render(<App/>, document.getElementById('root'));