import React from 'react';
import '../styles/loginpage/forgotpassword.css';

export const ForgotPassword = () => {
    return (
        <div className="main-forgot-container">
            <div className="forgot-container">
                <h1 className="forgot-title">Forgot Password</h1>
                <form className="form-forgot-container" method="POST" action="/change-password">
                    <div className="input-container">
                        <label className="lbl-input">Email</label>
                        <input type="email" className="input email-input"/>
                    </div>
                    <button type="submit" className="button-forgot">Get Code</button>
                </form>
                <a href="/login" className="link-login-forgot">Login</a>
                <a href="/register" className="link-register-forgot">Register</a>
            </div>
        </div>
    )
};