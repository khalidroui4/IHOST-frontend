import React from 'react';
import { Check, ArrowRight, Zap, Shield, Globe, Mail, Cloud, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../pageTransition';

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
                <section className="hero" style={{ background: '#0B1F3A', padding: '10rem 0 6rem', color: 'white', textAlign: 'center' }}>
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
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                                        {cat.plans.map((plan, pIdx) => (
                                            <div key={pIdx} style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 20px rgba(0,0,0,0.02)' }}>
                                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>{plan.name}</h3>
                                                <div style={{ marginBottom: '2rem' }}>
                                                    <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0B1F3A' }}>{plan.price}</span>
                                                    <span style={{ color: '#64748B', fontWeight: 600 }}> DH/mois</span>
                                                </div>
                                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                                    {plan.features.map((f, fIdx) => (
                                                        <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#4B5563' }}>
                                                            <Check size={18} color={cat.color} /> {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Link to={cat.link} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: cat.color, fontWeight: 700, textDecoration: 'none' }}>
                                                    Voir tous les détails <ArrowRight size={18} />
                                                </Link>
                                            </div>
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
