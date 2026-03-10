import React from 'react';
import { ShieldCheck, Smartphone, ArrowRight } from 'lucide-react';
import PageTransition from '../../pageTransition';

const TwoFactorAuth = () => {
    return (
        <PageTransition>
            <div style={{ padding: '2rem', maxWidth: '500px', margin: '4rem auto' }}>
                <div style={{ background: 'white', padding: '3rem', borderRadius: '24px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                    <div style={{ background: '#EFF6FF', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#1E6BFF' }}>
                        <ShieldCheck size={40} />
                    </div>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', color: '#0B1F3A' }}>Double Authentification</h1>
                    <p style={{ color: '#64748B', marginBottom: '2.5rem', lineHeight: '1.6' }}>
                        Sécurisez votre compte en ajoutant une étape de vérification supplémentaire.
                    </p>
                    <div style={{ textAlign: 'left', background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                            <Smartphone size={24} color="#1E6BFF" />
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Application TOTP</h4>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#94A3B8' }}>Google Authenticator, Authy, etc.</p>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-full">Activer maintenant <ArrowRight size={18} /></button>
                </div>
            </div>
        </PageTransition>
    );
};

export default TwoFactorAuth;
