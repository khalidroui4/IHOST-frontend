import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Globe, Shield, Zap, Calendar, ShoppingCart, CheckCircle2, RotateCw, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './DomainRegistrationModal.css';

const DomainRegistrationModal = ({ 
    isOpen,
    onClose,
    onConfirm, 
    initialDomain, 
    popularExtensions = [],
    initialDuration = 1,
    initialIncludePrivacy = false,
    isEdit = false
}) => {
    const parts = initialDomain.split('.');
    const initialName = parts[0];
    const initialExt = '.' + parts.slice(1).join('.');

    const [selectedExt, setSelectedExt] = useState(initialExt);
    const [duration, setDuration] = useState(initialDuration);
    const [includePrivacy, setIncludePrivacy] = useState(initialIncludePrivacy);
    const [isChecking, setIsChecking] = useState(false);
    const [availability, setAvailability] = useState({ available: true, domain: initialDomain });
    const privacyPrice = 50;

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen || selectedExt === initialExt) {
            if (selectedExt === initialExt) setAvailability({ available: true, domain: initialDomain });
            return;
        }

        const checkDomain = async () => {
            const domainToCheck = initialName + selectedExt;
            setIsChecking(true);
            try {
                const res = await axios.get(`/IHOST-backend/domains/check/${domainToCheck}`);
                setAvailability({ available: res.data.available, domain: domainToCheck });
            } catch (err) {
                setAvailability({ available: false, domain: domainToCheck, error: true });
            } finally {
                setIsChecking(false);
            }
        };

        const timer = setTimeout(checkDomain, 500);
        return () => clearTimeout(timer);
    }, [selectedExt, initialName, isOpen, initialDomain, initialExt]);

    if (!isOpen) return null;

    if (!popularExtensions || popularExtensions.length === 0) {
        return createPortal(
            <div className="drm-backdrop" onClick={onClose}>
                <div className="drm-panel" onClick={e => e.stopPropagation()}>
                    <button className="drm-close" onClick={onClose} aria-label="Fermer"><X size={20} /></button>
                    <div className="drm-body" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p>Aucune extension de domaine n'est actuellement disponible.</p>
                    </div>
                </div>
            </div>,
            document.body
        );
    }

    const currentExtData = popularExtensions.find(e => e.ext === selectedExt) || popularExtensions[0];
    const basePrice = parseFloat(currentExtData.price);
    const totalPrice = (basePrice * duration) + (includePrivacy ? privacyPrice * duration : 0);

    const handleAddToCart = () => {
        if (!availability.available || isChecking) return;
        onConfirm({
            domainName: availability.domain,
            durationYears: duration,
            includePrivacy,
            totalPrice
        });
    };

    return createPortal(
        <div className="drm-backdrop" onClick={onClose}>
            <div className="drm-panel" onClick={e => e.stopPropagation()}>
                <button className="drm-close" onClick={onClose} aria-label="Fermer">
                    <X size={20} />
                </button>

                <div className="drm-header">
                    <div className="drm-icon-wrap">
                        <Globe size={32} />
                    </div>
                    <div className="drm-title-area">
                        <h2 className="drm-title">Enregistrer votre domaine</h2>
                        <div className="drm-domain-display">
                            <span className="name">{initialName}</span>
                            <span className={`ext ${isChecking ? 'checking' : availability.available ? 'available' : 'taken'}`}>
                                {selectedExt}
                            </span>
                            {isChecking && <RotateCw size={14} className="spinner" style={{ marginLeft: '0.5rem' }} />}
                        </div>
                    </div>
                </div>

                <div className="drm-body">
                    <div className="drm-section">
                        <label className="drm-section-label">
                            <Globe size={18} /> Choisir l'extension
                        </label>
                        <div className="drm-ext-grid">
                            {popularExtensions.map(item => (
                                <button 
                                    key={item.ext}
                                    onClick={() => setSelectedExt(item.ext)}
                                    className={`drm-ext-btn ${selectedExt === item.ext ? 'active' : ''}`}
                                >
                                    <span className="ext-name">{item.ext}</span>
                                    <span className="ext-price">{item.price} DH</span>
                                </button>
                            ))}
                        </div>
                        {!isChecking && !availability.available && (
                            <div className="drm-error-msg">
                                <AlertCircle size={14} /> Ce domaine est déjà pris en {selectedExt}.
                            </div>
                        )}
                    </div>

                    <div className="drm-section">
                        <label className="drm-section-label">
                            <Calendar size={18} /> Période d'enregistrement
                        </label>
                        <div className="drm-duration-grid">
                            {[1, 2, 3, 5, 10].map(year => (
                                <button 
                                    key={year}
                                    onClick={() => setDuration(year)}
                                    className={`drm-duration-btn ${duration === year ? 'active' : ''}`}
                                >
                                    <span className="year-num">{year}</span>
                                    <span className="year-text">{year > 1 ? 'Ans' : 'An'}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="drm-section">
                        <label className="drm-section-label">
                            <Shield size={18} /> Options de Protection
                        </label>
                        <div 
                            className={`drm-option-card ${includePrivacy ? 'active' : ''}`}
                            onClick={() => setIncludePrivacy(!includePrivacy)}
                        >
                            <div className="option-info">
                                <h4 className="option-title">Protection WHOIS</h4>
                                <p className="option-desc">Essentiel pour masquer vos données personnelles.</p>
                            </div>
                            <div className="option-price">
                                <span className="price-val">+{privacyPrice} DH</span>
                                <span className="price-period">/an</span>
                            </div>
                            <div className="option-check">
                                {includePrivacy ? <CheckCircle2 size={24} fill="#1E6BFF" color="white" /> : <div className="check-empty" />}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="drm-footer">
                    <div className="drm-summary">
                        <div className="summary-label">Montant total</div>
                        <div className="summary-amount">
                            {totalPrice.toFixed(2)} <span className="currency">DH</span>
                        </div>
                    </div>
                    <button 
                        className="drm-submit-btn" 
                        onClick={handleAddToCart}
                        disabled={!availability.available || isChecking}
                        style={{ opacity: (!availability.available || isChecking) ? 0.6 : 1, cursor: (!availability.available || isChecking) ? 'not-allowed' : 'pointer' }}
                    >
                        <ShoppingCart size={20} /> {isEdit ? 'Mettre à jour' : 'Ajouter au panier'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DomainRegistrationModal;
