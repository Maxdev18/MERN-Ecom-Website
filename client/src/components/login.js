import React from 'react';
import '../styles/loginpage/login.css'

const Axios = require('axios');

export const Login = () => {
    function handleLogin() {
        Axios.post('/auth/login')
    }

    return (
        <div className="main-login-container">
            <div className="login-container">
                <h1 className="login-title">Login</h1>
                <form className="form-login-container" method="POST" action="/auth/login">
                    <div className="input-container">
                        <label className="lbl-input">Email</label>
                        <input type="email" className="input email-input" name="email"/>
                    </div>
                    <div className="input-container">
                        <div className="pw-input-container">
                            <label className="lbl-input">Password</label>
                            <a href="/forgot-password" className="link-forgot">Forgot password?</a>
                        </div>
                        <input type="password" className="input pw-input" name="password"/>
                    </div>
                    <button type="submit" className="button-login">Login</button>
                </form>
                <a href="/register" className="link-register" onClick={handleLogin}>Register</a>
            </div>
        </div>
    )
};