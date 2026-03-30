import React from 'react';
import { Mail, FileText, LayoutTemplate, Users, Cloud, MonitorSmartphone, Shield, Repeat, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import LuxeCard from '../../components/LuxeCard';

const Microsoft365 = () => {
    return (
        <PageTransition>
            <div className="email-page">
                <section className="hero">
                    <div className="hero-background" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div className="pattern-grid-tech" />
                        <div className="hero-overlay" />
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/Microsoft-365.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.15, mixBlendMode: 'luminosity', zIndex: 0 }} />
                        <div className="container-luxe hero-content" style={{ zIndex: 10 }}>
                            <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                                <h1 className="font-tech" style={{ fontSize: '3.8rem', color: '#fff', marginBottom: '1.5rem' }}>Le Standard de l'Industrie</h1>
                                <p className="hero-subtext" style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', marginBottom: '4rem', lineHeight: '1.7', fontWeight: 400 }}>Équipez votre entreprise de la suite de productivité la plus puissante au monde. Office 365, Exchange et Teams pour une efficacité absolue.</p>
                                <div className="hero-buttons" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                                    <Link to="/signup" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}>Choisir Microsoft 365 <ArrowRight size={20} /></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-white" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>La Suite Office de Référence</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Travaillez avec les versions toujours à jour de vos applications préférées, sur tous vos appareils.</p>
                        </div>
                        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
                            {[
                                { icon: Mail, title: "Outlook / Exchange", desc: "Messagerie de classe entreprise avec 50 Go de stockage par utilisateur.", color: "#0072c6" },
                                { icon: FileText, title: "Word / Excel", desc: "Le traitement de texte et le tableur les plus avancés du marché.", color: "#2b579a" },
                                { icon: LayoutTemplate, title: "PowerPoint", desc: "Créez des présentations percutantes avec des outils de design intelligents.", color: "#b7472a" },
                                { icon: Cloud, title: "OneDrive Business", desc: "1 To de stockage cloud par utilisateur pour sécuriser tous vos documents.", color: "#0078d4" },
                                { icon: Users, title: "Microsoft Teams", desc: "Le hub central pour le chat d'équipe, les réunions et la collaboration.", color: "#464eb8" }
                            ].map((item, idx) => (
                                <div key={idx} style={{
                                    textAlign: 'center',
                                    padding: '3rem 2rem',
                                    background: 'white',
                                    borderRadius: '32px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                                    border: '1px solid rgba(11, 31, 58, 0.1)',
                                    transition: 'all 0.3s ease-in-out'
                                }} className="hover-lift">
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        background: `${item.color}10`,
                                        color: item.color,
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 1.5rem',
                                        border: `1px solid ${item.color}20`
                                    }}>
                                        <item.icon size={32} />
                                    </div>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem' }}>{item.title}</h3>
                                    <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: '1.6' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-premium bg-light" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
                    <div className="container-luxe">
                        <div className="section-header" style={{ marginBottom: '5rem', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#0B1F3A', marginBottom: '1rem', letterSpacing: '-1px' }}>La puissance du Cloud Microsoft</h2>
                            <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>Décuplez votre productivité grâce à une intégration parfaite entre tous vos outils.</p>
                        </div>
                        <div className="features-grid">
                            <LuxeCard icon={Users} title="Collaboration Teams" desc="Connectez vos équipes via des visioconférences HD et des espaces de chat partagés pour une réactivité totale." />
                            <LuxeCard icon={Shield} title="Sécurité Azure" desc="Profitez de la protection Microsoft contre le spam et les malwares, avec un chiffrement des données au repos et en transit." />
                            <LuxeCard icon={LayoutTemplate} title="Installations Multiples" desc="Chaque utilisateur peut installer les apps Office complètes sur un maximum de 5 PC/Mac, 5 tablettes et 5 mobiles." />
                            <LuxeCard icon={Repeat} title="Synchro OneDrive" desc="Accédez à vos documents hors ligne et synchronisez-les automatiquement dès que vous retrouvez une connexion." />
                        </div>
                    </div>
                </section>

                <section style={{ padding: '6rem 2rem', background: 'white' }}>
                    <div className="container-luxe">
                        <div className="m365-split-box" style={{
                            background: 'linear-gradient(135deg, #0078d4 0%, #001a33 100%)',
                            padding: '5rem',
                            borderRadius: '40px',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontWeight: 900, marginBottom: '2rem' }}>Prêt pour l'hybride ?</h2>
                                <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '3rem', lineHeight: '1.8' }}>
                                    Microsoft 365 est la solution idéale pour le travail à distance. Nos experts gèrent pour vous le déploiement des licences et le support technique de vos utilisateurs.
                                </p>
                                <div className="m365-checklist" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    {[
                                        "Assistance au déploiement",
                                        "Facturation simplifiée",
                                        "Accompagnement Admin",
                                        "Garantie de SLA 99.9%"
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1rem' }}>
                                            <CheckCircle2 size={22} color="#10b981" /> {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(20px)',
                                    padding: '3rem 2rem',
                                    borderRadius: '32px',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}>
                                    <Cloud size={56} color="white" style={{ marginBottom: '1.5rem' }} />
                                    <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>Déploiement Pro</h3>
                                    <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Nous migrons vos anciennes données Exchange/Outlook vers M365.</p>
                                    <button className="btn" style={{ background: 'white', color: '#0078d4', padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 800, border: 'none' }}>Démarrer la Migration</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-split" style={{ padding: '4rem 1rem' }}>
                    <div className="container-luxe">
                        <div className="email-cta-box" style={{
                            background: 'linear-gradient(135deg, #0B1F3A 0%, #1E6BFF 100%)',
                            borderRadius: '32px',
                            padding: '4rem 2.5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ fontWeight: 800, marginBottom: '1.5rem' }}>Besoin d'aide pour choisir ?</h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '750px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
                                Entre Google Workspace et Microsoft 365, le choix peut être difficile. Nos architectes cloud sont là pour vous guider.
                            </p>
                            <Link to="/contact" className="btn" style={{
                                background: 'white',
                                color: '#0078d4',
                                padding: '1rem 2.5rem',
                                borderRadius: '100px',
                                fontWeight: 800,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                textDecoration: 'none'
                            }}>
                                Consulter un Architecte <ArrowRight size={22} />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default Microsoft365;
