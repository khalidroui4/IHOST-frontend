import {
    Server, Cloud, ShoppingCart, Layers, Globe, ArrowRightLeft,
    DollarSign, Search, ShieldCheck, Crown, Users, Mail, Briefcase,
    Layout, ShieldAlert, Lock, Database, Award, Code, Activity,
    Cpu, Network, TrendingUp, Megaphone, Target, Info, Handshake,
    FileText, Newspaper, Rss, LayoutTemplate
} from 'lucide-react';

export const navData = [
    {
        title: 'Hébergement',
        items: [
            { title: 'Hébergement Mutualisé', desc: 'Votre présence en ligne à faible coût.', icon: Server, href: '/hebergement/mutualise' },
            { title: 'Hébergement Cloud', desc: "Optez pour la puissance d'un serveur dédié sans tracas.", icon: Cloud, href: '/hebergement/cloud' },
            { title: 'Hébergement E-Commerce', desc: 'Votre boutique en ligne optimisée.', icon: ShoppingCart, href: '/hebergement/ecommerce' },
            { title: 'Hébergement Multi-sites', desc: 'Gérez plusieurs sites web complètement.', icon: Layers, href: '/hebergement/multisites' },
        ]
    },
    {
        title: 'Domaines',
        items: [
            { title: 'Register Domain', desc: 'Enregistrez votre nouveau domaine.', icon: Globe, href: '/domaines/register' },
            { title: 'Transfer Domain', desc: 'Transférez votre domaine chez nous.', icon: ArrowRightLeft, href: '/domaines/transfer' },
            { title: 'Domain Pricing', desc: 'Consultez nos tarifs compétitifs.', icon: DollarSign, href: '/domaines/pricing' },
            { title: 'WHOIS Lookup', desc: 'Vérifiez la disponibilité d\'un domaine.', icon: Search, href: '/domaines/whois' },
            { title: 'Domain Protection', desc: 'Protégez vos informations personnelles.', icon: ShieldCheck, href: '/domaines/protection' },
            { title: 'Premium Domains', desc: 'Découvrez nos domaines premium.', icon: Crown, href: '/domaines/premium' },
            { title: 'Reseller Domains', desc: 'Devenez revendeur de domaines.', icon: Users, href: '/domaines/reseller' },
        ]
    },
    {
        title: 'Email & Collaboration',
        items: [
            { title: 'Professional Email', desc: 'Email professionnel avec votre domaine.', icon: Mail, href: '/email-collaboration/pro' },
            { title: 'Business Email', desc: 'Solutions d\'email pour entreprises.', icon: Briefcase, href: '/email-collaboration/business' },
            { title: 'Google Workspace', desc: 'Outils de collaboration Google.', icon: Cloud, href: '/email-collaboration/google-workspace' },
            { title: 'Microsoft 365', desc: 'Suite bureautique et email Microsoft.', icon: Layout, href: '/email-collaboration/microsoft-365' },
            { title: 'Anti-Spam', desc: 'Protection avancée contre le spam.', icon: ShieldAlert, href: '/email-collaboration/anti-spam' },
            { title: 'Email Security', desc: 'Sécurisez vos communications.', icon: Lock, href: '/email-collaboration/security' },
            { title: 'Email Archiving', desc: 'Archivage légal et sécurisé.', icon: Database, href: '/email-collaboration/archiving' },
        ]
    },
    {
        title: 'Sécurité',
        items: [
            { title: 'SSL Certificates', desc: 'Sécurisez votre site avec SSL.', icon: Lock, href: '/securite/ssl' },
            { title: 'Wildcard SSL', desc: 'Sécurisez des sous-domaines illimités.', icon: Globe, href: '/securite/wildcard' },
            { title: 'EV SSL', desc: 'Certificat à validation étendue.', icon: Award, href: '/securite/ev' },
            { title: 'Code Signing', desc: 'Signez vos applications et scripts.', icon: Code, href: '/securite/code-signing' },
            { title: 'SiteLock', desc: 'Protection contre les malwares.', icon: ShieldCheck, href: '/securite/sitelock' },
            { title: 'DDoS Protection', desc: 'Protection avancée contre les attaques.', icon: Activity, href: '/securite/ddos' },
            { title: 'Firewall', desc: 'Pare-feu d\'application web (WAF).', icon: Server, href: '/securite/waf' },
            { title: 'Malware Protection', desc: 'Détection et suppression de malwares.', icon: Cpu, href: '/securite/malware' },
            { title: 'Security Monitoring', desc: 'Surveillance proactive 24/7.', icon: Network, href: '/securite/monitoring' },
        ]
    },
    {
        title: 'Web & Marketing',
        items: [
            { title: 'Website Builder', desc: 'Créez votre site web facilement.', icon: LayoutTemplate, href: '/web-marketing/builder' },
            { title: 'Web Development', desc: 'Développement sur mesure.', icon: Code, href: '/web-marketing/development' },
            { title: 'SEO', desc: 'Optimisation pour les moteurs de recherche.', icon: Search, href: '/web-marketing/seo' },
            { title: 'Google Ads', desc: 'Publicité ciblée (SEA).', icon: Megaphone, href: '/web-marketing/ads' },
            { title: 'Digital Marketing', desc: 'Stratégies marketing complètes.', icon: TrendingUp, href: '/web-marketing/digital' },
            { title: 'Brand Protection', desc: 'Protégez votre réputation en ligne.', icon: ShieldAlert, href: '/web-marketing/brand' },
        ]
    },
    {
        title: 'Entreprise',
        items: [
            { title: 'À propos', desc: 'Découvrez notre mission et nos valeurs.', icon: Info, href: '/entreprise/about' },
            { title: 'Data Centers', desc: 'Nos infrastructures haute disponibilité.', icon: Server, href: '/entreprise/datacenters' },
            { title: 'Partenaires', desc: 'Rejoignez notre programme partenaires.', icon: Users, href: '/entreprise/partners' },
            { title: 'Carrières', desc: 'Rejoignez notre équipe passionnée.', icon: Briefcase, href: '/entreprise/careers' },
            { title: 'Blog', desc: 'Actualités, tutoriels et conseils.', icon: Newspaper, href: '/entreprise/blog' },
            { title: 'Presse', desc: 'Communiqués et ressources médias.', icon: Rss, href: '/entreprise/press' },
            { title: 'Certifications', desc: 'Nos normes de sécurité et qualité.', icon: Award, href: '/entreprise/certifications' },
            { title: 'Documents Légaux', desc: 'Conditions et politiques.', icon: FileText, href: '/entreprise/legal' },
        ]
    }
];
