import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Search, ChevronDown, CheckCircle2, Zap, Shield, Headset, Globe, CloudDownload, Check, Twitter, Instagram, Youtube, Linkedin, Lock, PhoneCall, CloudLightning, Mail, Github } from 'lucide-react';
import "bootstrap";



const domainOptions = [
    '.ma', '.com', '.net', '.info', '.org',
    '.co.ma', '.org.ma', '.net.ma', '.edu.ma',
    '.press.ma', '.gov.ma', '.ac.ma'
];

const Home = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState('select');
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-content">
                        <h1>Hébergez votre projet en<br />toute confiance avec<br />IHOST</h1>
                        <p className="hero-subtext">Solutions d'hébergement fiables, noms de domaine et<br />support technique pour particuliers et entreprises au Maroc.</p>

                        <div className="hero-buttons">
                            <a href="/" className="btn">Commencer maintenant <ArrowUpRight size={18} /></a>
                            <a href="/" className="btn">Voir les offres <ArrowUpRight size={18} /></a>
                        </div>

                        <div className="domain-search">
                            <div className="search-input-container">
                                <Search className="search-icon" size={20} />
                                <input type="text" placeholder="exemple.ma" />
                                <div className="search-dropdown-container" ref={dropdownRef}>
                                    <div
                                        className="search-dropdown"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        {selectedDomain} <ChevronDown size={16} />
                                    </div>
                                    {isDropdownOpen && (
                                        <ul className="dropdown-menu-custom">
                                            {domainOptions.map((option) => (
                                                <li
                                                    key={option}
                                                    className={`dropdown-item-custom ${selectedDomain === option ? 'selected' : ''}`}
                                                    onClick={() => {
                                                        setSelectedDomain(option);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="hero-features">
                            <span className="feature-item"><Zap size={16} color="#fbbf24" style={{ fill: "#fbbf24" }} /> Activation rapide</span>
                            <span className="feature-item"><Lock size={16} color="#fbbf24" style={{ fill: "#fbbf24" }} /> Protection avancée</span>
                            <span className="feature-item"><PhoneCall size={16} color="#94a3b8" /> Support 24/7</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing">
                <div className="section-header">
                    <h2>Nos Offres D'Hébergement</h2>
                    <p>Des Solutions Adaptées À Chaque Type De Projet</p>
                </div>

                <div className="pricing-cards">
                    <div className="pricing-card">
                        <h3>Hébergement Mutualisé</h3>
                        <p className="card-subtitle">Idéal pour lancer votre premier site web.</p>
                        <div className="price">
                            <span className="from">A partir de</span>
                            <span className="amount">39</span>
                            <span className="period">DH / mois</span>
                        </div>
                        <ul className="features-list">
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> 1 site web</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> 10 GB Stockage SSD</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> 1 compte email professionnel</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Certificat SSL gratuit</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Support technique inclus</li>
                        </ul>
                        <button className="btn-plan">Choisir cette offre</button>
                    </div>

                    <div className="pricing-card popular">
                        <div className="popular-badge">LE PLUS POPULAIRE</div>
                        <h3>VPS Performant</h3>
                        <p className="card-subtitle">Performance, fonctionnalités, et plus!</p>
                        <div className="price">
                            <span className="from">A partir de</span>
                            <span className="amount">149</span>
                            <span className="period">DH / mois</span>
                        </div>
                        <ul className="features-list">
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Ressources dédiées</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Stockage NVMe haute vitesse</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Accès root</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Sauvegardes automatiques</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Sécurité renforcée</li>
                        </ul>
                        <button className="btn-plan">Commander maintenant</button>
                    </div>

                    <div className="pricing-card">
                        <h3>Hébergement Ultra</h3>
                        <p className="card-subtitle">Ressources dédiées, sécurité et vitesse</p>
                        <div className="price">
                            <span className="from">A partir de</span>
                            <span className="amount">990</span>
                            <span className="period">DH / an</span>
                        </div>
                        <ul className="features-list">
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Domaine offert</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> 10 To Stockage SSD</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Trafic illimité</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Certificat SSL gratuit</li>
                            <li><Check size={18} strokeWidth={3} className="check-icon" /> Sauvegarde chaque heure</li>
                        </ul>
                        <button className="btn-plan">Commander</button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="features-grid-section">
                <div className="section-header">
                    <h2>Pourquoi choisir IHOST ?</h2>
                    <p>Une infrastructure fiable, sécurisée et performante<br />pour vos projets web.</p>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><CloudLightning size={24} strokeWidth={2.5} /></div>
                        <h4>Performance élevée</h4>
                        <p>Serveurs optimisés NVMe garantissant rapidité et temps de chargement minimal.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><Shield size={24} strokeWidth={2.5} /></div>
                        <h4>Sécurité renforcée</h4>
                        <p>Protection SSL, surveillance continue et sécurité avancée contre les menaces.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><Headset size={24} strokeWidth={2.5} /></div>
                        <h4>Support technique 24/7</h4>
                        <p>Une équipe disponible à tout moment pour vous accompagner.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><CheckCircle2 size={24} strokeWidth={2.5} /></div>
                        <h4>Disponibilité 99.9%</h4>
                        <p>Infrastructure stable assurant un accès permanent à votre site web.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><Globe size={24} strokeWidth={2.5} /></div>
                        <h4>Infrastructure locale</h4>
                        <p>Solutions adaptées au marché marocain avec performances optimisées.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><CloudDownload size={24} strokeWidth={2.5} /></div>
                        <h4>Installation rapide</h4>
                        <p>Déployez votre site en quelques minutes sans compétences techniques.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-top">
                    <div className="footer-company">
                        <div className="footer-logo">IHOST</div>
                        <p className="footer-description">
                            Simplifiez la gestion de votre hébergement web. Une plateforme fiable et performante pour créer, sécuriser et faire évoluer vos projets en ligne.
                        </p>
                        <p className="footer-description">
                            Hébergez, sécurisez et développez votre présence en ligne avec IHOST.
                        </p>
                        <div className="footer-socials">
                            <a href="/"><Mail size={20} strokeWidth={1.5} /></a>
                            <a href="/"><Instagram size={20} strokeWidth={1.5} /></a>
                            <a href="/"><Github size={20} strokeWidth={1.5} /></a>
                            <a href="/"><Linkedin size={20} strokeWidth={1.5} /></a>
                        </div>
                    </div>

                    <div className="footer-links-section">
                        <h4 className="footer-nav-title">Navigation</h4>
                        <div className="footer-nav-links">
                            <a href="/">Home</a>
                            <a href="/">Hosting</a>
                            <a href="/">Domains</a>
                            <a href="/">Email & Collaboration</a>
                            <a href="/">Security</a>
                            <a href="/">Web & Marketing</a>
                            <a href="/">Company</a>
                            <a href="/">Client Area</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2026 IHOST. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
