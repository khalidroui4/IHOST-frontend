import React from 'react';
import { Link } from 'react-router-dom';

const EntrepriseHero = ({ title, subtitle, ctaText = null, onCtaClick = null, customContent = null }) => {
    return (
        <section className="hero" style={{
            minHeight: '450px',
            paddingBottom: '4rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}>
            <div className="hero-background" style={{ opacity: 0.1, backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff', fontWeight: '800', letterSpacing: '-0.02em' }}>{title}</h1>
                <p className="hero-subtext" style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#94a3b8' }}>
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
                                <button onClick={onCtaClick} className="btn" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 'bold' }}>{ctaText}</button>
                            ) : (
                                <Link to="/contact" className="btn" style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 'bold' }}>{ctaText}</Link>
                            )}
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default EntrepriseHero;
