import React from 'react';
import './GenericPage.css';
import { useLocation } from 'react-router-dom';
import { Sparkles, ArrowRight, Rocket } from 'lucide-react';
import PageTransition from '../pageTransition';

const GenericPage = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentPageName = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].replace(/-/g, ' ')
        : 'Page';

    const title = currentPageName.replace(/\b\w/g, l => l.toUpperCase());


    return (
        <PageTransition>
            <div className="generic-page-container">
                <div className="generic-header">
                    <div className="generic-badge">
                        <Sparkles size={16} /> En construction
                    </div>
                    <h1>{title}</h1>
                    <p>Cette page est actuellement en cours de développement. Revenez bientôt pour découvrir notre nouveau contenu !</p>
                </div>

                <div className="generic-content-area">
                    <div className="generic-card">
                        <div className="generic-card-icon"><Rocket size={24}/></div>
                        <h3>Bientôt disponible</h3>
                        <p>Nous préparons quelque chose d'incroyable pour cette section. Notre équipe travaille dur pour vous offrir la meilleure expérience possible sur IHOST.</p>
                        <a href="/" className="btn-return">
                            Retour à l'accueil <ArrowRight size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default GenericPage;
