//Import modules
import React from 'react';
import '../styles/components/footer.css';

export const Footer = () => {
    //Render footer
    return (
        <footer className="footer-container">
            <div className="footer-links-container">
                <a href="/products">Products</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </div>  

            <div className="footer-contact-container">
                <div className="footer-contact-title-container">
                    <h2 className="footer-contact-title">Have a question?</h2>
                    <p className="footer-contact-description">Contact us for any help</p>
                </div>
                
                <button className="footer-contact-btn"><a href="/contact">Contact</a></button>
            </div>
        </footer>
    );

};