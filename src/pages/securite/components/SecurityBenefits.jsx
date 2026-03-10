import React from 'react';

const SecurityBenefits = ({ benefits, title = "Fonctionnalités & Avantages", subtitle = "Une architecture pensée pour contrer les menaces modernes" }) => {
    return (
        <section className="features-section" style={{ backgroundColor: '#f8fafc', padding: '5rem 2rem' }}>
            <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h2 style={{ color: '#0f172a' }}>{title}</h2>
                <p style={{ color: '#64748b' }}>{subtitle}</p>
            </div>

            <div className="features-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {benefits.map((benefit, index) => (
                    <div key={index} className="feature-card" style={{
                        background: 'white',
                        padding: '2.5rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        textAlign: 'left',
                        borderTop: '4px solid #3b82f6' // Subtle active border
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        {benefit.icon && (
                            <div className="feature-icon" style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#eff6ff',
                                color: '#2563eb',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <benefit.icon size={30} strokeWidth={1.5} />
                            </div>
                        )}
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#0f172a' }}>{benefit.title}</h3>
                        {benefit.desc && <p style={{ color: '#64748b', lineHeight: '1.6', margin: 0 }}>{benefit.desc}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SecurityBenefits;
