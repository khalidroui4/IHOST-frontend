import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from "../pageTransition";
import '../styles/auth.css';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(location.pathname === '/signIn');

    useEffect(() => {
        if (location.pathname === '/signIn') {
            setIsLogin(true);
        } else if (location.pathname === '/signUp') {
            setIsLogin(false);
        }
    }, [location.pathname]);

    const handleSwitch = (toLogin) => {
        setIsLogin(toLogin);
        navigate(toLogin ? '/signIn' : '/signUp', { replace: true });
    };

    return (
        <PageTransition>
            <div className="auth-page-wrapper">
                <div className="auth-container-sliding">

                    
                    <motion.div
                        className="auth-image-panel"
                        initial={false}
                        animate={{ x: isLogin ? '100%' : '0%' }}
                        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }} // Smooth easing
                    >
                        <div className="auth-overlay sliding-overlay">
                            <AnimatePresence mode="wait">
                                {isLogin ? (
                                    <motion.div
                                        key="login-img"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="auth-image-content-wrapper"
                                    >
                                        <div className="auth-image-content">
                                            <h2>Merci pour<br />revoir sur IHOST</h2>
                                            <p>Vous avez déjà un compte ! Bon retour parmi nous.</p>
                                        </div>
                                        <div className="auth-image-footer">
                                            <span>Vous n'avez pas encore de compte ?</span>
                                            <button onClick={() => handleSwitch(false)} className="btn-auth-link">S'inscrire ici</button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="signup-img"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="auth-image-content-wrapper"
                                    >
                                        <div className="auth-image-content">
                                            <h2>Rejoignez IHOST</h2>
                                            <p>Si vous n'avez pas encore de compte, créez-en un et rejoignez-nous.</p>
                                        </div>
                                        <div className="auth-image-footer">
                                            <span>Vous avez déjà un compte ?</span>
                                            <button onClick={() => handleSwitch(true)} className="btn-auth-link">Se connecter ici</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    <motion.div
                        className="auth-form-panel"
                        initial={false}
                        animate={{ x: isLogin ? '-100%' : '0%' }}
                        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }} 
                    >
                        <div className="auth-form-content-wrapper">
                            <AnimatePresence mode="wait">
                                {isLogin ? (
                                    <motion.div
                                        key="login-form"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="auth-form-container"
                                    >
                                        <h1 className="auth-title">Welcome back </h1>
                                        <p className="auth-subtitle">Nous sommes heureux de vous revoir sur IHOST</p>

                                        <form className="auth-form signin-form" onSubmit={(e) => e.preventDefault()}>
                                            <div className="form-group">
                                                <label>Email :</label>
                                                <input type="email" />
                                            </div>
                                            <div className="form-group">
                                                <label>Mot de passe :</label>
                                                <input type="password" />
                                            </div>

                                            <button type="submit" className="btn-auth-submit">Se connecter</button>
                                        </form>
                                        <p className="auth-terms">En rejoignant, vous acceptez les Conditions et la Politique de Confidentialité</p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="signup-form"
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                        className="auth-form-container"
                                    >
                                        <h1 className="auth-title">Rejoignez IHOST</h1>
                                        <p className="auth-subtitle">CRÉEZ UN COMPTE ET REJOIGNEZ NOTRE SITE POUR VIVRE LA MEILLEURE EXPÉRIENCE AVEC NOUS</p>

                                        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                                            <div className="form-row">
                                                <div className="form-group half">
                                                    <label>Prénom :</label>
                                                    <input type="text" />
                                                </div>
                                                <div className="form-group half">
                                                    <label>Nom :</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Nom d'utilisateur :</label>
                                                <input type="text" />
                                            </div>
                                            <div className="form-group">
                                                <label>Email :</label>
                                                <input type="email" />
                                            </div>
                                            <div className="form-group">
                                                <label>Mot de passe :</label>
                                                <input type="password" />
                                            </div>

                                            <button type="submit" className="btn-auth-submit">REJOINDRE</button>
                                        </form>
                                        <p className="auth-terms">En rejoignant, vous acceptez les Conditions et la Politique de Confidentialité</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Auth;
