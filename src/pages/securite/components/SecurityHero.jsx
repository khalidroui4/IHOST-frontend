import React from 'react';
import { Link } from 'react-router-dom';

const SecurityHero = ({ title, subtitle, ctaText = "Activer la protection", onCtaClick = null, customContent = null }) => {
    return (
        <section className="hero" style={{
            minHeight: '500px',
            paddingBottom: '4rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        }}>
            <div className="hero-background" style={{ opacity: 0.1, backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>{title}</h1>
                <p className="hero-subtext" style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#cbd5e1' }}>
                    {subtitle}
                </p>

                {customContent ? (
                    <div style={{ marginTop: '2rem' }}>
                        {customContent}
                    </div>
                ) : (
                    ctaText && (
                        <div className="hero-buttons">
                            {onCtaClick ? (
                                <button onClick={onCtaClick} className="btn" style={{ background: '#3b82f6', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>{ctaText}</button>
                            ) : (
                                <Link to="/signup" className="btn" style={{ background: '#3b82f6', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>{ctaText}</Link>
                            )}
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default SecurityHero;
