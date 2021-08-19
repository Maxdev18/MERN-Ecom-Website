import React from 'react';
import '../styles/loginpage/register.css';

export const Register = () => {
    return (
        <div className="main-register-container">
            <div className="register-container">
                <h1 className="register-title">Register</h1>
                <form className="form-register-container" method="POST" action="/">
                    <div className="input-container">
                        <label className="lbl-input">Email</label>
                        <input type="email" className="input email-input"/>
                    </div>
                    <div className="input-container">
                        <label className="lbl-input">Password</label>
                        <input type="password" className="input pw-input"/>
                    </div>
                    <div className="input-container">
                        <label className="lbl-input">Confirm password</label>
                        <input type="password" className="input pw-input"/>
                    </div>
                    <button type="submit" className="button-register">Register</button>
                </form>
                <a href="/login" className="link-login">Login</a>
            </div>
        </div>
    )
};