import React from 'react';
import './LegalPage.css';
import PageTransition from '../../pageTransition';

const Privacy = () => {
    return (
        <PageTransition>
            <div className="legal-page-container">
                <div className="legal-header">
                    <h1>Politique de confidentialité</h1>
                    <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
                </div>

                <div className="legal-content">
                    <h2>1. Collecte des informations</h2>
                    <p>Chez IHOST, nous accordons une grande importance à la vie privée de nos utilisateurs. Nous collectons les informations que vous nous fournissez directement lors de la création d'un compte, telles que votre nom complet, adresse e-mail, numéro de téléphone et détails de facturation nécessaires pour traiter vos commandes d'hébergement ou de noms de domaine.</p>

                    <h2>2. Utilisation de vos données</h2>
                    <p>Les informations que nous recueillons sont utilisées aux fins suivantes :</p>
                    <ul>
                        <li>Pour fournir, exploiter et maintenir nos services d'hébergement web.</li>
                        <li>Pour traiter les paiements et prévenir les transactions frauduleuses.</li>
                        <li>Pour communiquer avec vous concernant votre compte, les mises à jour techniques et les alertes de sécurité.</li>
                        <li>Pour l'enregistrement de vos noms de domaine (auprès des registres agréés ICANN/ANRT).</li>
                        <li>Pour améliorer nos services et l'expérience utilisateur globale.</li>
                    </ul>

                    <h2>3. Protection et Sécurité</h2>
                    <p>IHOST s'engage à protéger la sécurité de vos données personnelles. Nous utilisons diverses technologies de sécurité et procédures, y compris le cryptage SSL/TLS, pour protéger vos données contre tout accès, utilisation ou divulgation non autorisés. Nos serveurs sont hébergés dans des datacenters certifiés répondant aux normes de sécurité les plus strictes de l'industrie.</p>

                    <h2>4. Partage d'informations</h2>
                    <p>Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos données uniquement dans les cas suivants :</p>
                    <ul>
                        <li>Avec nos fournisseurs de services de confiance (processeurs de paiement, registraires de domaine) pour l'exécution de nos contrats.</li>
                        <li>Pour se conformer à une obligation légale, selon les lois marocaines et internationales applicables.</li>
                        <li>Pour protéger nos droits vitaux et ceux de nos utilisateurs.</li>
                    </ul>

                    <h2>5. Politique relative aux Cookies</h2>
                    <p>Notre site utilise des "cookies", de petits fichiers texte placés sur votre appareil, pour analyser l'utilisation du site, offrir une navigation personnalisée et permettre le bon fonctionnement de votre Espace Client. Vous pouvez refuser l'utilisation de cookies en modifiant les paramètres de votre navigateur, bien que cela puisse limiter certaines fonctionnalités de notre site.</p>

                    <h2>6. Vos droits (Conformité RGPD et CNDP)</h2>
                    <p>En vertu de la législation en vigueur (y compris la loi 09-08 au Maroc et le RGPD en Europe), vous bénéficiez du droit d'accéder, de rectifier, de supprimer et de limiter le traitement de vos données personnelles. Vous pouvez exercer ces droits à tout moment en contactant notre équipe DPO (Délégué à la Protection des Données).</p>

                    <h2>7. Nous contacter</h2>
                    <p>Pour toute question ou demande concernant notre Politique de confidentialité ou vos données personnelles, veuillez nous contacter à privacy@ihost.ma ou via la page <a href="/legal/signaler-probleme">Signaler un problème</a>.</p>
                </div>
            </div>
        </PageTransition>
    );
};

export default Privacy;
