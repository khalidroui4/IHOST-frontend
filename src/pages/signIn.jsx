import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from "../pageTransition";
import '../styles/auth.css';

function Signin() {
    return (
        <PageTransition>
            <div className="auth-page-wrapper">
                <div className="auth-container reverse">
                    <div className="auth-left auth-form-side">
                        <div className="auth-form-container">
                            <h1 className="auth-title">Welcome back to IHOST</h1>
                            <p className="auth-subtitle">We're happy you came back to IHOST</p>

                            <form className="auth-form signin-form">
                                <div className="form-group">
                                    <label>Email :</label>
                                    <input type="email" />
                                </div>
                                <div className="form-group">
                                    <label>Password :</label>
                                    <input type="password" />
                                </div>

                                <button type="submit" className="btn-auth-submit">Connect to your account</button>
                            </form>
                            <p className="auth-terms">By joining , you agree to the Terms and Privacy Policy</p>
                        </div>
                    </div>

                    <div className="auth-right auth-image-side">
                        <div className="auth-overlay">
                            <div className="auth-image-content">
                                <h2>Welcome Back to<br />IHOST</h2>
                                <p>You have already an account ! Welcome back user</p>
                            </div>
                            <div className="auth-image-footer">
                                <span>You don't have an Account ?</span>
                                <Link to="/signUp" className="btn-auth-link">Sign up Here</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default Signin;
