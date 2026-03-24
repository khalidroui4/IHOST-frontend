import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../store/slices/authSlice';
import PageTransition from "../pageTransition";
import PasswordStrength from '../components/security/PasswordStrength';
import Captcha from '../components/security/Captcha';
import '../styles/auth.css';

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user, isLoading, error: authError } = useSelector(state => state.auth);
    const [localError, setLocalError] = useState(null);

    const [isLogin, setIsLogin] = useState(location.pathname === '/signIn');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (location.pathname === '/signIn') {
            setIsLogin(true);
        } else if (location.pathname === '/signUp') {
            setIsLogin(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isAuthenticated && user) {
            const path = user.role === 'admin' ? '/admin/dashboard' : '/client/dashboard';
            navigate(path);
        }
    }, [isAuthenticated, user, navigate]);

    const handleSwitch = (toLogin) => {
        setIsLogin(toLogin);
        setLocalError(null);
        navigate(toLogin ? '/signIn' : '/signUp', { replace: true });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [isCaptchaVerified, setIsCaptchaVerified] = useState(true); // Default true for login, will update for signup

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        if (!isLogin && !isCaptchaVerified) {
            setLocalError({ message: "Veuillez vérifier le CAPTCHA." });
            return;
        }

        try {
            if (isLogin) {
                await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();
            } else {
                await dispatch(registerUser({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })).unwrap();
                
                // Switch to login on successful registration
                handleSwitch(true);
            }
        } catch (err) {
            setLocalError(err);
        }
    };

    return (
        <PageTransition>
            <div className="auth-page-wrapper">
                <div className="auth-container-sliding">
                    <motion.div
                        className="auth-image-panel"
                        initial={false}
                        animate={{ x: isLogin ? '100%' : '0%' }}
                        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
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
                                            <h2>Merci pour<br />votre visite sur IHOST</h2>
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

                                        {localError && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{localError.message || 'Error occurred'}</div>}
                                        {authError && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{authError}</div>}

                                        <form className="auth-form signin-form" onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label>Email :</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Mot de passe :</label>
                                                <div className="password-input-wrapper">
                                                    <input 
                                                        type={showPassword ? "text" : "password"} 
                                                        name="password" 
                                                        value={formData.password} 
                                                        onChange={handleChange} 
                                                        required 
                                                    />
                                                    <button 
                                                        type="button" 
                                                        className="password-toggle"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <button type="submit" className="btn-auth-submit" disabled={isLoading}>
                                                {isLoading ? 'Connexion...' : 'Se connecter'}
                                            </button>
                                        </form>
                                        <p className="auth-terms">En rejoignant, vous acceptez <Link to="/legal/conditions">les Conditions</Link> et <Link to="/legal/confidentialite">la Politique de Confidentialité</Link></p>
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

                                        {localError && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{localError.errors ? Object.values(localError.errors).flat()[0] : (localError.message || 'Error occurred')}</div>}
                                        {authError && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{authError}</div>}

                                        <form className="auth-form" onSubmit={handleSubmit}>
                                            <div className="form-row">
                                                <div className="form-group half">
                                                    <label>Prénom :</label>
                                                    <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
                                                </div>
                                                <div className="form-group half">
                                                    <label>Nom :</label>
                                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Nom d'utilisateur :</label>
                                                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Email :</label>
                                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                            </div>
                                              <div className="form-group">
                                                  <label>Mot de passe :</label>
                                                  <div className="password-input-wrapper">
                                                      <input 
                                                          type={showPassword ? "text" : "password"} 
                                                          name="password" 
                                                          value={formData.password} 
                                                          onChange={handleChange} 
                                                          required 
                                                      />
                                                      <button 
                                                          type="button" 
                                                          className="password-toggle"
                                                          onClick={() => setShowPassword(!showPassword)}
                                                      >
                                                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                      </button>
                                                  </div>
                                                  {formData.password && <PasswordStrength password={formData.password} />}
                                              </div>

                                             <Captcha onVerify={setIsCaptchaVerified} />

                                             <button type="submit" className="btn-auth-submit" style={{ marginTop: '2rem' }} disabled={isLoading || (!isLogin && !isCaptchaVerified)}>
                                                 {isLoading ? 'Inscription...' : 'REJOINDRE'}
                                             </button>
                                        </form>
                                        <p className="auth-terms">En rejoignant, vous acceptez <Link to="/legal/conditions">les Conditions</Link> et <Link to="/legal/confidentialite">la Politique de Confidentialité</Link></p>
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
