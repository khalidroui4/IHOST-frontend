import React from 'react';
import { Link } from 'react-router-dom';

const MarketingHero = ({ title, subtitle, ctaText = "Commencer", onCtaClick = null, customContent = null }) => {
    return (
        <section className="hero" style={{
            minHeight: '500px',
            paddingBottom: '4rem',
            background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
        }}>
            <div className="hero-background" style={{ opacity: 0.15, backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff', textShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>{title}</h1>
                <p className="hero-subtext" style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#fdf2f8' }}>
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
                                <button onClick={onCtaClick} className="btn" style={{ background: 'white', color: '#db2777', border: 'none', boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.5)' }}>{ctaText}</button>
                            ) : (
                                <Link to="/contact" className="btn" style={{ background: 'white', color: '#db2777', border: 'none', boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.5)' }}>{ctaText}</Link>
                            )}
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default MarketingHero;
