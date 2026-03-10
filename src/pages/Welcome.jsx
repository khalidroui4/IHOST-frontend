import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PageTransition from '../pageTransition';
import '../styles/auth.css';

const Welcome = () => {
    const location = useLocation();
    const userState = location.state?.user;

    // Use passed data or fallback to a demo profile for preview
    const user = userState || {
        first_name: 'Client',
        last_name: 'IHOST',
        username: 'client_ihost',
        email: 'contact@ihost.ma',
        created_at: new Date().toISOString()
    };

    return (
        <PageTransition>
            <div className="auth-page-wrapper">
                <div className="auth-container-sliding" style={{ height: 'auto', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <h1 className="auth-title">Bienvenue, {user.first_name}!</h1>
                    <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>Votre compte a été créé avec succès.</p>

                    <div className="welcome-details" style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', width: '100%', maxWidth: '500px', textAlign: 'left', border: '1px solid #e2e8f0' }}>
                        <div style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                            <strong style={{ color: '#1E6BFF' }}>Nom complet:</strong>
                            <span style={{ float: 'right', color: '#1e293b' }}>{user.first_name} {user.last_name}</span>
                        </div>
                        <div style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                            <strong style={{ color: '#1E6BFF' }}>Nom d'utilisateur:</strong>
                            <span style={{ float: 'right', color: '#1e293b' }}>@{user.username}</span>
                        </div>
                        <div style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                            <strong style={{ color: '#1E6BFF' }}>Email:</strong>
                            <span style={{ float: 'right', color: '#1e293b' }}>{user.email}</span>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <strong style={{ color: '#1E6BFF' }}>Compte créé le:</strong>
                            <span style={{ float: 'right', color: '#1e293b' }}>{new Date(user.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <a href="/" className="btn-auth-submit" style={{ textDecoration: 'none', marginTop: '2.5rem', display: 'inline-block', width: 'auto', padding: '1rem 3rem' }}>
                        Aller au tableau de bord
                    </a>
                </div>
            </div>
        </PageTransition>
    );
};

export default Welcome;
