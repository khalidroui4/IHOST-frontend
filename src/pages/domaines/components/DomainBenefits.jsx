
const DomainBenefits = ({ benefits, title = "Pourquoi choisir IHOST ?", subtitle = "Des avantages conçus pour sécuriser votre identité en ligne" }) => {
    return (
        <section className="features-section" style={{ backgroundColor: '#f8fafc', padding: '5rem 2rem' }}>
            <div className="section-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h2 style={{ color: '#1F2937' }}>{title}</h2>
                <p style={{ color: '#4B5563' }}>{subtitle}</p>
            </div>

            <div className="features-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {benefits.map((benefit, index) => (
                    <div key={index} className="feature-card" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', transition: 'transform 0.3s ease', textAlign: 'left' }}>
                        {benefit.icon && (
                            <div className="feature-icon" style={{ width: '50px', height: '50px', backgroundColor: '#F5F7FA', color: '#1E6BFF', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <benefit.icon size={26} strokeWidth={1.5} />
                            </div>
                        )}
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#1F2937' }}>{benefit.title}</h3>
                        {benefit.desc && <p style={{ color: '#4B5563', lineHeight: '1.6' }}>{benefit.desc}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DomainBenefits;
