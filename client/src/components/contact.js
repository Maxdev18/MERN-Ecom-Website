import * as React from 'react';
import '../styles/contactpage/contact.css';
import axios from 'axios';

export function Contact() {
    //POST request to the server to send message
    axios.post('/contact');

    return (
        <div className="contact-container">
            <h1 className="title">Contact Us</h1>
            <div className="form-container">
                <form className="contact-form" method="POST" action="/contact">
                    <div className="input-container">
                        <label className="input-label">E-mail:</label>
                        <input type="email" className="input" placeholder="Email" name="email" />
                    </div>
                    <div className="input-container">
                        <label className="input-label">Description:</label>
                        <textarea className="input description-input" placeholder="Description" name="description" />
                    </div>
                    <button type="submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
