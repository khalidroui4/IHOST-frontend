import React from 'react';
import './LegalPage.css';
import PageTransition from '../../pageTransition';

const Terms = () => {
    return (
        <PageTransition>
            <div className="legal-page-wrapper">
                <div className="legal-page-container">
                    <div className="legal-header">
                        <h1>Conditions d'utilisation</h1>
                        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
                    </div>

                    <div className="legal-content">
                        <h2>1. Acceptation des conditions</h2>
                        <p>En accédant et en utilisant les services d'IHOST ("nous", "notre", "nos"), vous acceptez d'être lié par les présentes Conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services d'hébergement web, de noms de domaine ou tout autre service associé.</p>

                        <h2>2. Description des services</h2>
                        <p>IHOST fournit un accès à divers services d'hébergement web, d'enregistrement de noms de domaine, de messagerie électronique et d'infrastructures cloud. Les détails, fonctionnalités et limitations spécifiques de chaque service sont définis dans votre plan de service au moment de l'achat.</p>

                        <h2>3. Obligations de l'utilisateur</h2>
                        <p>En tant qu'utilisateur de nos services, vous acceptez de :</p>
                        <ul>
                            <li>Fournir des informations d'identification et de facturation exactes, actuelles et complètes.</li>
                            <li>Maintenir la sécurité et la confidentialité de vos mots de passe et données de compte.</li>
                            <li>Être responsable de toutes les activités qui se produisent sous votre compte.</li>
                            <li>Ne pas utiliser nos services pour toute activité illégale, nuisible ou non autorisée.</li>
                        </ul>

                        <h2>4. Paiement et Renouvellement</h2>
                        <p>Les frais de service sont facturés à l'avance selon la période sélectionnée (mensuelle, annuelle, etc.). Sauf résiliation expresse de votre part avant la fin du cycle de facturation en cours, vos services seront automatiquement renouvelés pour assurer la continuité de votre présence en ligne.</p>

                        <h2>5. Politique de remboursement</h2>
                        <p>Nous offrons une garantie de remboursement sous 30 jours pour nos services d'hébergement mutualisé. Toutefois, les frais d'enregistrement, de transfert ou de renouvellement de noms de domaine, ainsi que les certificats SSL, ne sont pas remboursables une fois activés.</p>

                        <h2>6. Limitation de responsabilité</h2>
                        <p>Dans toute la mesure permise par la loi applicable, IHOST ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris, sans s'y limiter, la perte de profits, de données, d'utilisation, de clientèle ou d'autres pertes intangibles résultant de votre accès ou de votre utilisation ou de votre incapacité à accéder ou utiliser nos services.</p>

                        <h2>7. Modifications des conditions</h2>
                        <p>Nous nous réservons le droit de modifier ces conditions à tout moment. Nous vous informerons de toute modification importante par e-mail ou via un avis bien visible dans votre espace client. L'utilisation continue de nos services après de telles modifications constitue votre consentement aux nouvelles conditions.</p>

                        <h2>8. Contact</h2>
                        <p>Si vous avez des questions concernant ces Conditions d'utilisation, veuillez contacter notre équipe juridique à legal@ihost.ma ou via la page <a href="/legal/signaler-probleme">Signaler un problème</a>.</p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Terms;
