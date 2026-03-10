import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/') return null;

    return (
        <button
            className="global-back-button"
            onClick={() => navigate(-1)}
            aria-label="Retour"
            title="Retour à la page précédente"
        >
            <ArrowLeft size={24} />
        </button>
    );
};

export default BackButton;
