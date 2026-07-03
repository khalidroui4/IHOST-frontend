import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Layers, Server, Globe, Shield, ShoppingCart, Cpu } from 'lucide-react';
import PageTransition from '../pageTransition';

const faqCategories = [
    { id: 'all', name: 'Tous', icon: HelpCircle },
    { id: 'mutualise', name: 'Hébergement Web', icon: Server },
    { id: 'cloud', name: 'Hébergement Cloud', icon: Cpu },
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCart },
    { id: 'multisites', name: 'Multi-Sites', icon: Layers },
    { id: 'domains', name: 'Noms de Domaine', icon: Globe }
];

const faqData = [
    // Shared Hosting
    {
        category: 'mutualise',
        question: "Qu'est-ce que l'hébergement mutualisé ?",
        answer: "C'est une solution où plusieurs sites web se partagent les ressources d'un même serveur physique (processeur, mémoire, stockage), idéale pour débuter un site à moindre coût avec une gestion simple."
    },
    {
        category: 'mutualise',
        question: "Puis-je installer WordPress sur mon hébergement ?",
        answer: "Oui, toutes nos offres d'hébergement incluent un installateur d'applications en 1 clic (Softaculous), vous permettant de déployer instantanément WordPress, Joomla, PrestaShop et plus de 100 autres CMS."
    },
    {
        category: 'mutualise',
        question: "Est-il possible d'évoluer vers une offre supérieure ?",
        answer: "Absolument. Vous pouvez faire évoluer votre offre (passer par exemple de Starter à Pro ou Business, ou même migrer vers le Cloud) à tout moment depuis votre Espace Client, de façon transparente et sans aucune coupure de service."
    },
    // Cloud
    {
        category: 'cloud',
        question: "Quelle est la différence entre l'hébergement Cloud et un VPS classique ?",
        answer: "L'hébergement Cloud IHOST offre une redondance matérielle complète au sein de notre cluster. Si un serveur physique tombe en panne, votre instance redémarre automatiquement sur un autre nœud en quelques secondes sans perte de données. Il offre également une flexibilité de mise à l'échelle instantanée."
    },
    {
        category: 'cloud',
        question: "Ai-je un accès root à mon serveur Cloud ?",
        answer: "Oui, vous disposez d'un contrôle total et d'accès administrateur complets (root) via SSH pour configurer votre serveur selon les besoins de vos applications."
    },
    // E-commerce
    {
        category: 'ecommerce',
        question: "Mon site WooCommerce ou PrestaShop sera-t-il rapide ?",
        answer: "Absolument. Nos solutions d'hébergement e-commerce intègrent des optimisations au niveau du serveur, notamment LiteSpeed Cache, Redis et Memcached, spécialement configurés pour accélérer le chargement des pages et le traitement des paniers d'achat."
    },
    {
        category: 'ecommerce',
        question: "Qu'en est-il de la sécurité des transactions et des paiements ?",
        answer: "La sécurité est primordiale pour les boutiques en ligne. Nous fournissons des certificats SSL Let's Encrypt gratuits avec renouvellement automatique, combinés à un pare-feu applicatif (WAF) avancé pour protéger votre site contre les injections de code et les attaques malveillantes."
    },
    // Multi-sites
    {
        category: 'multisites',
        question: "Puis-je héberger les sites web de mes clients ?",
        answer: "Oui, nos offres Multi-Sites sont parfaitement adaptées aux freelances, développeurs et agences web qui souhaitent centraliser la gestion de plusieurs sites clients de manière isolée et sécurisée sous un même abonnement."
    },
    {
        category: 'multisites',
        question: "La bande passante est-elle réellement illimitée ?",
        answer: "Oui, la bande passante est illimitée pour un trafic web normal. Elle est soumise à notre politique d'utilisation équitable ('Fair Use') afin de garantir des performances stables pour l'ensemble des utilisateurs sur le serveur."
    },
    // Domains
    {
        category: 'domains',
        question: "Comment puis-je transférer mon nom de domaine vers IHOST ?",
        answer: "Le transfert se fait en 3 étapes simples : demandez le code d'autorisation (Auth-Code) à votre registraire actuel, déverrouillez le domaine, puis lancez la commande de transfert sur notre site. Le transfert prolonge généralement la validité du domaine d'un an gratuitement."
    },
    {
        category: 'domains',
        question: "Qu'est-ce que la protection WHOIS et pourquoi l'activer ?",
        answer: "La protection WHOIS masque vos informations de contact personnelles (nom, adresse e-mail, téléphone) dans la base de données publique WHOIS. Elle les remplace par des coordonnées génériques IHOST afin de vous prémunir contre le spam, le phishing et le vol d'identité."
    }
];

const FAQ = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedIndices, setExpandedIndices] = useState({});

    const toggleAccordion = (index) => {
        setExpandedIndices(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Filter FAQ entries based on category and search query
    const filteredFaq = faqData.filter((item, idx) => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <PageTransition>
            <div className="faq-page" style={{ background: '#051121', color: '#ffffff', minHeight: '100vh', paddingBottom: '6rem' }}>
                {/* Hero Header */}
                <section className="hero" style={{ position: 'relative', overflow: 'hidden', padding: '8rem 2rem 5rem' }}>
                    <div className="hero-background" style={{
                        background: 'linear-gradient(135deg, #051121 0%, #0b1f3a 50%, #134ea8 100%)',
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0
                    }}>
                        <div className="pattern-grid-tech" style={{ opacity: 0.03 }} />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '600px',
                            height: '600px',
                            background: 'radial-gradient(circle, rgba(30, 107, 255, 0.15) 0%, rgba(30, 107, 255, 0) 70%)',
                            pointerEvents: 'none'
                        }} />
                    </div>

                    <div className="container-luxe" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <h1 className="font-tech" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            Comment pouvons-nous vous aider ?
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '3rem', lineHeight: '1.6' }}>
                            Retrouvez les réponses à toutes vos questions concernant nos solutions d'hébergement web, de noms de domaine et de serveurs cloud.
                        </p>

                        {/* Search Bar */}
                        <div style={{
                            maxWidth: '650px',
                            margin: '0 auto',
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(12px)',
                            padding: '6px',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                            transition: 'all 0.3s ease'
                        }}
                        className="search-container-focus"
                        >
                            <Search size={22} color="rgba(255, 255, 255, 0.5)" style={{ marginLeft: '1.2rem' }} />
                            <input
                                type="text"
                                placeholder="Rechercher une question ou un mot-clé..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    padding: '0.8rem 1rem',
                                    fontSize: '1.1rem',
                                    color: '#ffffff',
                                    background: 'transparent'
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Categories Tabs */}
                <section className="container-luxe" style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        flexWrap: 'wrap',
                        marginBottom: '4rem'
                    }}>
                        {faqCategories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.6rem',
                                        padding: '0.8rem 1.5rem',
                                        borderRadius: '12px',
                                        border: isActive ? '1px solid #3B82F6' : '1px solid rgba(255, 255, 255, 0.08)',
                                        background: isActive ? 'rgba(37, 99, 235, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                                        color: isActive ? '#60A5FA' : 'rgba(255, 255, 255, 0.75)',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={e => {
                                        if(!isActive) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                                            e.currentTarget.style.color = '#fff';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if(!isActive) {
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                                            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                                        }
                                    }}
                                >
                                    <Icon size={18} />
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Accordion list */}
                    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                        {filteredFaq.length > 0 ? (
                            filteredFaq.map((item, index) => {
                                const isOpen = !!expandedIndices[index];
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            background: 'rgba(11, 31, 58, 0.4)',
                                            borderRadius: '16px',
                                            border: isOpen ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                                            padding: '1.5rem 1.8rem',
                                            marginBottom: '1.2rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.25s ease',
                                            boxShadow: isOpen ? '0 10px 25px rgba(30, 107, 255, 0.1)' : 'none'
                                        }}
                                        onClick={() => toggleAccordion(index)}
                                        onMouseEnter={e => {
                                            if(!isOpen) {
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                                                e.currentTarget.style.background = 'rgba(11, 31, 58, 0.6)';
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if(!isOpen) {
                                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                                e.currentTarget.style.background = 'rgba(11, 31, 58, 0.4)';
                                            }
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                            <h3 style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 700,
                                                color: isOpen ? '#60A5FA' : '#ffffff',
                                                margin: 0,
                                                transition: 'color 0.2s ease'
                                            }}>
                                                {item.question}
                                            </h3>
                                            <div style={{ color: isOpen ? '#60A5FA' : 'rgba(255, 255, 255, 0.4)', flexShrink: 0 }}>
                                                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            </div>
                                        </div>

                                        {/* Answer with smooth transition wrapper */}
                                        <div style={{
                                            maxHeight: isOpen ? '500px' : '0',
                                            opacity: isOpen ? '1' : '0',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                            marginTop: isOpen ? '1.2rem' : '0'
                                        }}>
                                            <p style={{
                                                color: 'rgba(255, 255, 255, 0.75)',
                                                fontSize: '1.05rem',
                                                lineHeight: '1.75',
                                                margin: 0,
                                                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                                                paddingTop: '1.2rem'
                                            }}>
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(11, 31, 58, 0.2)', borderRadius: '16px', border: '1px dashed rgba(255, 255, 255, 0.1)' }}>
                                <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>
                                    Aucune question ne correspond à votre recherche.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default FAQ;
