import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from "../pageTransition";
import '../styles/auth.css';

function Signup() {
    return (
        <PageTransition>
            <div className="auth-page-wrapper">
                <div className="auth-container">
                    <div className="auth-left auth-image-side">
                        <div className="auth-overlay">
                            <div className="auth-image-content">
                                <h2>Join IHOST</h2>
                                <p>if you don't have an account create one and join us</p>
                            </div>
                            <div className="auth-image-footer">
                                <span>You already have an Account ?</span> 
                                <Link to="/signIn" className="btn-auth-link">Login Here</Link>
                            </div>
                        </div>
                    </div>
                    <div className="auth-right auth-form-side">
                        <div className="auth-form-container">
                            <h1 className="auth-title">Join IHOST</h1>
                            <p className="auth-subtitle">CREATE AN ACCOUNT AND JOIN OUR WEBSITE TO LIVE THE BEST EXPERIENCE WITH US</p>

                            <form className="auth-form">
                                <div className="form-row">
                                    <div className="form-group half">
                                        <label>first name :</label>
                                        <input type="text" />
                                    </div>
                                    <div className="form-group half">
                                        <label>last name :</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Username :</label>
                                    <input type="text" />
                                </div>
                                <div className="form-group">
                                    <label>Email :</label>
                                    <input type="email" />
                                </div>
                                <div className="form-group">
                                    <label>Password :</label>
                                    <input type="password" />
                                </div>

                                <button type="submit" className="btn-auth-submit">JOIN</button>
                            </form>
                            <p className="auth-terms">By joining , you agree to the Terms and Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    )
}

export default Signup;
