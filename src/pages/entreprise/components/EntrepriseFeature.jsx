import React from 'react';

const EntrepriseFeature = ({ features, title = "", subtitle = "", layout = 'grid' }) => {
    return (
        <section className="features-section" style={{ backgroundColor: '#fff', padding: '5rem 2rem' }}>
            {(title || subtitle) && (
                <div className="section-header" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    {title && <h2 style={{ color: '#0f172a', fontWeight: 'bold' }}>{title}</h2>}
                    {subtitle && <p style={{ color: '#64748b', maxWidth: '700px', margin: '1rem auto 0' }}>{subtitle}</p>}
                </div>
            )}

            <div className="features-grid" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: layout === 'grid' ? 'grid' : 'flex',
                flexDirection: layout === 'grid' ? 'unset' : 'column',
                gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fit, minmax(280px, 1fr))' : 'unset',
                gap: '2rem'
            }}>
                {features.map((feature, index) => (
                    <div key={index} className="feature-card" style={{
                        background: '#f8fafc', 
                        padding: '2.5rem 2rem',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        display: layout === 'grid' ? 'block' : 'flex',
                        alignItems: layout === 'grid' ? 'unset' : 'flex-start',
                        gap: layout === 'grid' ? '0' : '2rem',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        textAlign: layout === 'grid' ? 'left' : 'left'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = layout === 'grid' ? 'translateY(-4px)' : 'translateX(4px)';
                            e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(15, 23, 42, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = layout === 'grid' ? 'translateY(0)' : 'translateX(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {feature.icon && (
                            <div className="feature-icon" style={{
                                width: '50px',
                                height: '50px',
                                backgroundColor: '#eff6ff',
                                color: '#2563eb',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: layout === 'grid' ? '1.5rem' : '0',
                                flexShrink: 0
                            }}>
                                <feature.icon size={24} strokeWidth={2} />
                            </div>
                        )}
                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a', fontWeight: 'bold' }}>{feature.title}</h3>
                            {feature.desc && <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>{feature.desc}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EntrepriseFeature;
