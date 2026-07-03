import {
    Server, Cloud, ShoppingCart, Layers, Globe, ArrowRightLeft,
    DollarSign, Search, Mail, Briefcase, Lock, PhoneCall, Info
} from 'lucide-react';

export const navData = [
    {
        title: 'Hébergement',
        items: [
            { title: 'Hébergement Mutualisé', desc: 'Votre présence en ligne à faible coût.', icon: Server, href: '/hebergement/mutualise' },
            { title: 'Hébergement Cloud', desc: "Optez pour la puissance d'un serveur dédié sans tracas.", icon: Cloud, href: '/hebergement/cloud' },
            { title: 'Hébergement E-Commerce', desc: 'Votre boutique en ligne optimisée.', icon: ShoppingCart, href: '/hebergement/ecommerce' },
            { title: 'Hébergement Multi-sites', desc: 'Gérez plusieurs sites web complètement.', icon: Layers, href: '/hebergement/multisites' },
            { title: 'Tous nos Tarifs', desc: 'Comparez nos solutions et tarifs.', icon: DollarSign, href: '/pricing' },
        ]
    },
    {
        title: 'Domaines',
        items: [
            { title: 'Register Domain', desc: 'Enregistrez votre nouveau domaine.', icon: Globe, href: '/domaines/register' },
            { title: 'Transfer Domain', desc: 'Transférez votre domaine chez nous.', icon: ArrowRightLeft, href: '/domaines/transfer' },
            { title: 'Domain Pricing', desc: 'Consultez nos tarifs compétitifs.', icon: DollarSign, href: '/domaines/pricing' },
            { title: 'WHOIS Lookup', desc: 'Vérifiez la disponibilité d\'un domaine.', icon: Search, href: '/domaines/whois' },
        ]
    },
    {
        title: 'Email & Collaboration',
        items: [
            { title: 'Professional Email', desc: 'Email professionnel avec votre domaine.', icon: Mail, href: '/email-collaboration/pro' },
            { title: 'Business Email', desc: 'Solutions d\'email pour entreprises.', icon: Briefcase, href: '/email-collaboration/business' },
        ]
    },
    {
        title: 'Sécurité',
        href: '/securite/ssl'
    },
    {
        title: 'Entreprise',
        items: [
            { title: 'À Propos', desc: 'Découvrez l\'histoire et les valeurs de IHOST.', icon: Info, href: '/about-us' },
            { title: 'Contact', desc: 'Besoin d\'aide ? Contactez-nous.', icon: PhoneCall, href: '/contact' },
        ]
    }
];
