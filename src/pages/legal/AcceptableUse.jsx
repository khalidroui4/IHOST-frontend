import React from 'react';
import './LegalPage.css';
import PageTransition from '../../pageTransition';

const AcceptableUse = () => {
    return (
        <PageTransition>
            <div className="legal-page-wrapper">
                <div className="legal-page-container">
                    <div className="legal-header">
                        <h1>Politique d'utilisation acceptable</h1>
                        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
                    </div>

                    <div className="legal-content">
                        <h2>1. Objectif de cette politique</h2>
                        <p>La présente Politique d'utilisation acceptable (PUA) d'IHOST a été conçue pour protéger notre infrastructure, nos clients et la communauté Internet au sens large contre les activités irresponsables, illégales ou perturbatrices. L'utilisation de nos services constitue l'acceptation de cette PUA.</p>

                        <h2>2. Utilisation illégale</h2>
                        <p>Les services IHOST ne peuvent être utilisés à des fins illégales ou pour soutenir des activités illégales. IHOST se réserve le droit de coopérer avec les autorités légales et de se conformer à toutes les ordonnances des tribunaux de la juridiction marocaine et internationale si nécessaire.</p>

                        <h2>3. Spam et courriers électroniques indésirables</h2>
                        <p>Nous appliquons une politique stricte de tolérance zéro envers le SPAM. L'envoi direct ou indirect d'e-mails en masse non sollicités est expressément interdit :</p>
                        <ul>
                            <li>Il est interdit d'héberger des serveurs ou d'exécuter des scripts visant au spamming délibéré.</li>
                            <li>Il est interdit de conserver des listes d'adresses e-mail non vérifiées acquises sans le consentement explicite des abonnés (opt-in).</li>
                            <li>La transmission de messages menaçants, harcelants ou malveillants est strictement défendue.</li>
                        </ul>

                        <h2>4. Contenu interdit</h2>
                        <p>Il est formellement interdit d'héberger, de transmettre ou de distribuer les matériels suivants sur nos serveurs :</p>
                        <ul>
                            <li>Matériel protégé par le droit d'auteur (sans autorisation appropriée), y compris le partage de fichiers piratés (warez, torrents illégaux).</li>
                            <li>Contenus liés à la pornographie infantile ou matériels obscènes non conformes aux lois en vigueur.</li>
                            <li>Malwares, virus, chevaux de Troie, vers, keyloggers ou tout autre composant malveillant (Phishing).</li>
                            <li>Discours de haine, contenus incitant à la violence physique ou à la discrimination.</li>
                        </ul>

                        <h2>5. Sécurité des serveurs et du réseau</h2>
                        <p>Toute tentative d'intrusion ou de compromission de la sécurité de nos systèmes est formellement interdite et donnera lieu à des enquêtes, des poursuites judiciaires et une annulation immédiate du service. Cela inclut, sans s'y limiter :</p>
                        <ul>
                            <li>Accès non autorisé à des données, serveurs ou réseaux.</li>
                            <li>Recherche de vulnérabilités, scan de ports ou attaques par déni de service (DDoS).</li>
                            <li>Falsification d'en-têtes TCP/IP ou usurpation d'identité réseau (Spoofing).</li>
                        </ul>

                        <h2>6. Utilisation des ressources système</h2>
                        <p>Sur les offres d'hébergement mutualisé, les ressources (CPU, RAM, I/O) sont réparties équitablement. IHOST peut imposer des limitations ou suspendre tout compte qui abuse continuellement de ces ressources de manière à impacter négativement les autres clients sur le même serveur (par exemple : minage de cryptomonnaies).</p>

                        <h2>7. Violation et suspension de compte</h2>
                        <p>Le non-respect de l'une de ces conditions entraînera l'une des actions suivantes, à notre seule discrétion : l'émission d'un avertissement, la suspension immédiate du compte pour enquête, ou la résiliation pure et simple du service sans droit à un remboursement.</p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default AcceptableUse;
