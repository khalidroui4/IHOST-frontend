import { Link } from 'react-router-dom';

const DomainHero = ({ title, subtitle, ctaText = "Rechercher", onCtaClick = null, customContent = null }) => {
    return (
        <section className="hero" style={{ minHeight: '500px', paddingBottom: '4rem' }}>
            <div className="hero-background">
                <div className="hero-content">
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#fff' }}>{title}</h1>
                    <p className="hero-subtext" style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2.5rem', color: '#e2e8f0' }}>
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
                                    <button onClick={onCtaClick} className="btn">{ctaText}</button>
                                ) : (
                                    <Link to="/signup" className="btn">{ctaText}</Link>
                                )}
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
};

export default DomainHero;
