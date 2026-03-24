import React from 'react';
import { Check, ArrowRight, Zap, Shield, Globe, Mail, Cloud, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../pageTransition';
import TechPricingCard from '../components/TechPricingCard';

const Pricing = () => {
    const categories = [
        {
            title: 'Hébergement Web',
            icon: Server,
            color: '#1E6BFF',
            plans: [
                { name: 'Starter', price: '29', features: ['1 Site', '10 GB SSD', 'SSL Gratuit'] },
                { name: 'Pro', price: '59', features: ['10 Sites', '50 GB SSD', 'Backup Auto'] },
                { name: 'Business', price: '99', features: ['Sites illimités', '100 GB SSD', 'Vitesse Max'] }
            ],
            link: '/hebergement/mutualise'
        },
        {
            title: 'Cloud & VPS',
            icon: Cloud,
            color: '#00C2FF',
            plans: [
                { name: 'Cloud Basic', price: '149', features: ['2 vCPU', '4 GB RAM', '80 GB SSD'] },
                { name: 'Cloud Pro', price: '249', features: ['4 vCPU', '8 GB RAM', '160 GB SSD'] },
                { name: 'Cloud Ent.', price: '449', features: ['8 vCPU', '16 GB RAM', '320 GB SSD'] }
            ],
            link: '/hebergement/cloud'
        },
        {
            title: 'Noms de Domaine',
            icon: Globe,
            color: '#6366F1',
            plans: [
                { name: '.MA', price: '150', features: ['Identité Marocaine', 'DNS Manager', 'Privacy Incluse'] },
                { name: '.COM', price: '120', features: ['Standard Mondial', 'Full Control', '24/7 Support'] },
                { name: '.ONLINE', price: '40', features: ['Promo Limitée', 'Nouveau & Moderne', 'Instant Active'] }
            ],
            link: '/domaines/pricing'
        }
    ];

    return (
        <PageTransition>
            <div className="pricing-page">
                <section className="hero" style={{ background: 'url(/pricing.png)',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center', padding: '10rem 0 6rem', color: 'white', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <h1 className="font-tech" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Solutions & Tarifs Transparentes</h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '700px', margin: '0 auto' }}>
                            Choisissez le plan qui correspond à vos ambitions. Pas de frais cachés, une flexibilité totale.
                        </p>
                    </div>
                </section>

                <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
                    <div className="container-luxe">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                            {categories.map((cat, idx) => (
                                <div key={idx}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                                        <div style={{ background: cat.color, color: 'white', padding: '0.8rem', borderRadius: '12px' }}>
                                            <cat.icon size={28} />
                                        </div>
                                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>{cat.title}</h2>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
                                        {cat.plans.map((plan, pIdx) => (
                                            <TechPricingCard
                                                key={pIdx}
                                                name={plan.name}
                                                price={plan.price}
                                                period="DH / mois"
                                                features={plan.features}
                                                highlight={pIdx === 1}
                                                badge={pIdx === 1 ? 'Populaire' : null}
                                                buttonText="Ajouter au panier"
                                                addToCartMode={true}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 0', background: 'white', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div style={{ background: '#f8fafc', padding: '4rem', borderRadius: '32px', border: '1px solid #e2e8f0' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1.5rem' }}>Besoin d'une solution sur mesure ?</h2>
                            <p style={{ fontSize: '1.2rem', color: '#4B5563', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                                Pour les infrastructures complexes ou les grands comptes, nos consultants vous accompagnent dans la définition de votre architecture.
                            </p>
                            <Link to="/contact" className="btn btn-primary" style={{ padding: '1.2rem 3rem' }}>Demander un Devis Personnalisé</Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Pricing;
