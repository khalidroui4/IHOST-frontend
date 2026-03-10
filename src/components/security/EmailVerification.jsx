import React from 'react';
import { Mail, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import PageTransition from '../../pageTransition';

const EmailVerification = () => {
    return (
        <PageTransition>
            <div style={{ padding: '2rem', maxWidth: '500px', margin: '4rem auto' }}>
                <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ background: '#F0FDF4', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#10B981' }}>
                        <Mail size={40} />
                    </div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', color: '#0B1F3A' }}>Vérifiez votre Email</h1>
                    <p style={{ color: '#64748B', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                        Nous avons envoyé un lien de confirmation à <strong>votre-email@exemple.com</strong>. Veuillez cliquer sur le lien pour activer votre compte.
                    </p>
                    
                    <div style={{ marginBottom: '2rem' }}>
                        <button className="btn btn-primary btn-full">Renvoyer l'email <RefreshCw size={18} style={{ marginLeft: '0.5rem' }} /></button>
                    </div>

                    <p style={{ fontSize: '0.9rem', color: '#94A3B8' }}>
                        Vous n'avez pas reçu l'email ? Vérifiez vos spams ou contactez le support.
                    </p>
                </div>
            </div>
        </PageTransition>
    );
};

export default EmailVerification;
