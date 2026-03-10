import { Zap, Shield, PhoneCall, Server, Cloud, ShoppingCart, Layers, CheckCircle2, CloudLightning, ShieldCheck, Database, Layout, Clock, Rocket, RefreshCw, Lock } from 'lucide-react';

export const hostingData = {
    mutualise: {
        id: 'mutualise',
        hero: {
            title: 'Hébergement Web Mutualisé Rapide et Fiable',
            subtitle: 'La solution idéale pour lancer votre site web, blog ou projet professionnel avec des performances optimisées et un prix accessible.',
            ctaText: 'Commencer maintenant'
        },
        benefits: [
            { icon: Zap, title: 'Performance optimisée', desc: 'Pour les petits et moyens sites web.' },
            { icon: Layout, title: 'Installation rapide', desc: 'Déploiement en 1 clic des CMS populaires (WordPress, etc.).' },
            { icon: Shield, title: 'Sécurité avancée', desc: 'Protection renforcée pour votre site Web.' },
            { icon: PhoneCall, title: 'Support technique rapide', desc: 'Une assistance dédiée pour vous aider.' }
        ],
        plans: [
            {
                name: 'Starter',
                price: '29',
                period: 'DH / mois',
                highlight: false,
                features: [
                    '1 site web',
                    '10 GB stockage SSD',
                    'Bande passante illimitée',
                    'Certificat SSL gratuit',
                    'Support technique'
                ]
            },
            {
                name: 'Pro',
                price: '59',
                period: 'DH / mois',
                highlight: true,
                badge: 'Le plus populaire',
                features: [
                    'Jusqu\'à 10 sites web',
                    '50 GB stockage SSD',
                    'Bande passante illimitée',
                    'SSL gratuit',
                    'Sauvegardes automatiques',
                    'Support prioritaire'
                ]
            },
            {
                name: 'Business',
                price: '99',
                period: 'DH / mois',
                highlight: false,
                features: [
                    'Sites web illimités',
                    '100 GB stockage SSD',
                    'Bande passante illimitée',
                    'SSL gratuit',
                    'Sauvegardes quotidiennes',
                    'Performance améliorée'
                ]
            }
        ],
        faq: [
            { question: 'Qu\'est-ce que l\'hébergement mutualisé ?', answer: 'C\'est une solution où plusieurs sites web se partagent les ressources d\'un même serveur, idéale pour débuter à moindre coût.' },
            { question: 'Puis-je installer WordPress ?', answer: 'Oui, nos offres incluent un installateur en 1 clic pour WordPress et plus de 100 autres applications.' },
            { question: 'Est-il possible d\'évoluer vers une offre supérieure ?', answer: 'Absolument, vous pouvez passer d\'un plan Starter à Pro ou Business à tout moment sans interruption de service.' }
        ]
    },
    cloud: {
        id: 'cloud',
        hero: {
            title: 'Hébergement Cloud Haute Performance',
            subtitle: 'Une infrastructure cloud moderne offrant puissance, flexibilité et disponibilité maximale pour vos applications.',
            ctaText: 'Découvrir les offres'
        },
        benefits: [
            { icon: Cloud, title: 'Scalez à l\'infini', desc: 'Infrastructure cloud scalable selon vos besoins.' },
            { icon: Rocket, title: 'Performance élevée', desc: 'Ressources Cloud dédiées pour une vitesse maximale.' },
            { icon: Clock, title: 'Haute disponibilité', desc: 'Uptime garanti pour assurer la continuité de votre service.' },
            { icon: ShieldCheck, title: 'Protection avancée', desc: 'Contre les attaques avec la mitigation Anti-DDoS.' }
        ],
        plans: [
            {
                name: 'Cloud Basic',
                price: '149',
                period: 'DH / mois',
                highlight: false,
                features: [
                    '2 vCPU',
                    '4 GB RAM',
                    '80 GB SSD',
                    'Bande passante illimitée'
                ]
            },
            {
                name: 'Cloud Pro',
                price: '249',
                period: 'DH / mois',
                highlight: true,
                badge: 'Recommandé',
                features: [
                    '4 vCPU',
                    '8 GB RAM',
                    '160 GB SSD',
                    'Performance optimisée'
                ]
            },
            {
                name: 'Cloud Enterprise',
                price: '449',
                period: 'DH / mois',
                highlight: false,
                features: [
                    '8 vCPU',
                    '16 GB RAM',
                    '320 GB SSD',
                    'Haute disponibilité'
                ]
            }
        ],
        faq: [
            { question: 'Quelle est la différence avec le VPS classique ?', answer: 'L\'hébergement Cloud offre une redondance matérielle : en cas de panne, vos instances redémarrent automatiquement sur un autre nœud physique de notre cluster.' },
            { question: 'Ai-je un accès root ?', answer: 'Oui, vous disposez d\'un contrôle total sur votre instance avec des accès administrateur (root).' }
        ]
    },
    ecommerce: {
        id: 'ecommerce',
        hero: {
            title: 'Hébergement Optimisé pour E-Commerce',
            subtitle: 'Une plateforme puissante conçue pour les boutiques en ligne avec rapidité, sécurité et fiabilité.',
            ctaText: 'Créer ma boutique'
        },
        benefits: [
            { icon: ShoppingCart, title: 'Optimisé E-Commerce', desc: 'Pour WooCommerce, PrestaShop et Magento.' },
            { icon: Zap, title: 'Chargement rapide', desc: 'Architecture optimisée pour convertir vos visiteurs.' },
            { icon: Lock, title: 'Sécurité renforcée', desc: 'Protection SSL et WAF pour sécuriser les transactions.' },
            { icon: Server, title: 'Haute disponibilité', desc: 'Votre boutique ouverte 24/7/365, sans pannes.' }
        ],
        plans: [
            {
                name: 'Shop Starter',
                price: '79',
                period: 'DH / mois',
                highlight: false,
                features: [
                    '1 boutique',
                    '50 GB stockage SSD',
                    'SSL gratuit',
                    'Sauvegardes automatiques'
                ]
            },
            {
                name: 'Shop Pro',
                price: '149',
                period: 'DH / mois',
                highlight: true,
                badge: 'Meilleur choix',
                features: [
                    '5 boutiques',
                    '100 GB stockage SSD',
                    'Performance améliorée',
                    'Support prioritaire'
                ]
            },
            {
                name: 'Shop Business',
                price: '249',
                period: 'DH / mois',
                highlight: false,
                features: [
                    'Boutiques illimitées',
                    '200 GB stockage SSD',
                    'Sécurité avancée',
                    'Sauvegardes quotidiennes'
                ]
            }
        ],
        faq: [
            { question: 'Mon site WooCommerce sera-t-il rapide ?', answer: 'Absolument, nos serveurs utilisent des caches spécifiques (Redis/Memcached) configurés pour les boutiques en ligne.' },
            { question: 'Qu\'en est-il de la sécurité des paiements ?', answer: 'Nos offres incluent des certificats SSL hautement sécurisés et un pare-feu applicatif (WAF) pour répondre aux normes e-commerce.' }
        ]
    },
    multisites: {
        id: 'multisites',
        hero: {
            title: 'Hébergement Multi-Sites Flexible',
            subtitle: 'Gérez plusieurs sites web depuis un seul compte avec une solution performante et économique.',
            ctaText: 'Voir les plans'
        },
        benefits: [
            { icon: Layers, title: 'Gestion centralisée', desc: 'Contrôlez plusieurs sites depuis une interface unique.' },
            { icon: Database, title: 'Ressources optimisées', desc: 'Allocation intelligente des ressources.' },
            { icon: CloudLightning, title: 'Installation rapide', desc: 'Déployez de nouveaux sites en un clic.' },
            { icon: RefreshCw, title: 'Sauvegardes auto', desc: 'Vos données sont sécurisées et répliquées.' }
        ],
        plans: [
            {
                name: 'Multi Starter',
                price: '69',
                period: 'DH / mois',
                highlight: false,
                features: [
                    'Jusqu\'à 5 sites web',
                    '50 GB stockage SSD',
                    'SSL gratuit pour tous',
                    'Support technique'
                ]
            },
            {
                name: 'Multi Pro',
                price: '129',
                period: 'DH / mois',
                highlight: true,
                badge: 'Le plus populaire',
                features: [
                    'Jusqu\'à 20 sites web',
                    '100 GB stockage SSD',
                    'Sauvegardes automatiques',
                    'Performance Isolation'
                ]
            },
            {
                name: 'Multi Unlimited',
                price: '199',
                period: 'DH / mois',
                highlight: false,
                features: [
                    'Sites web illimités',
                    '200 GB stockage SSD',
                    'Performance maximale',
                    'Sauvegardes quotidiennes'
                ]
            }
        ],
        faq: [
            { question: 'Puis-je héberger les sites de mes clients ?', answer: 'Oui, cette offre est idéale pour les freelances et petites agences gérant de multiples projets.' },
            { question: 'La bande passante est-elle vraiment illimitée ?', answer: 'Oui, sous réserve d\'une utilisation légitime et équitable ("Fair Use") respectant nos conditions de service.' }
        ]
    }
};
