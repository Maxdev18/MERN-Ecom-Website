import React from 'react';
import '../styles/loginpage/register.css';

const Axios = require('axios');

export const Register = () => {

    function handleRegistration() {
        Axios.post('/auth/register')
    }

    return (
        <div className="main-register-container">
            <div className="register-container">
                <h1 className="register-title">Register</h1>
                <form className="form-register-container" method="POST" action="/auth/register">
                    <div className="input-container">
                        <label className="lbl-input">First name</label>
                        <input type="text" className="input firstName-input" name="firstName"/>
                    </div>
                    <div className="input-container">
                        <label className="lbl-input">Last name</label>
                        <input type="text" className="input lastName-input" name="lastName"/>
                    </div>
                    <div className="input-container">
                        <label className="lbl-input">Email</label>
                        <input type="email" className="input email-input" name="email"/>
                    </div>
                    <div className="input-container">
                        <label className="lbl-input">Password</label>
                        <input type="password" className="input pw-input" name="password"/>
                    </div>
                    <button type="submit" className="button-register" onClick={handleRegistration}>Register</button>
                </form>
                <a href="/login" className="link-login">Login</a>
            </div>
        </div>
    )
};