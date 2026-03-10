import React from 'react';

const MarketingBenefits = ({ benefits, title = "Pourquoi nous choisir ?", subtitle = "Des stratégies orientées résultats pour votre croissance" }) => {
    return (
        <section className="features-section" style={{ backgroundColor: '#fdf2f8', padding: '5rem 2rem' }}>
            <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ color: '#1e1b4b' }}>{title}</h2>
                <p style={{ color: '#64748b' }}>{subtitle}</p>
            </div>

            <div className="features-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {benefits.map((benefit, index) => (
                    <div key={index} className="feature-card" style={{
                        background: 'white',
                        padding: '2.5rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.05), 0 2px 4px -1px rgba(236, 72, 153, 0.03)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        textAlign: 'left',
                        borderTop: '4px solid #db2777' // Vibrant pink border
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(236, 72, 153, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(236, 72, 153, 0.05)';
                        }}
                    >
                        {benefit.icon && (
                            <div className="feature-icon" style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#fdf2f8',
                                color: '#db2777',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <benefit.icon size={30} strokeWidth={1.5} />
                            </div>
                        )}
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#1e1b4b' }}>{benefit.title}</h3>
                        {benefit.desc && <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>{benefit.desc}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketingBenefits;
