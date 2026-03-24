import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, X, Check, Package, Tag } from 'lucide-react';
import './ConfirmCartModal.css';


const ConfirmCartModal = ({ item, onConfirm, onCancel }) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onCancel(); };
        document.addEventListener('keydown', handleKey);
        // Prevent background scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = 'unset';
        };
    }, [onCancel]);

    if (!item) return null;

    const modalContent = (
        <div className="ccm-backdrop" onClick={onCancel}>
            <div className="ccm-panel" onClick={e => e.stopPropagation()}>

                <button className="ccm-close" onClick={onCancel} aria-label="Fermer">
                    <X size={18} />
                </button>

                <div className="ccm-icon-wrap">
                    <ShoppingCart size={32} />
                </div>

                <h2 className="ccm-title">Ajouter au panier ?</h2>
                <p className="ccm-subtitle">
                    Vous êtes sur le point d'ajouter l'offre suivante à votre panier.
                </p>

                <div className="ccm-plan-card">
                    <div className="ccm-plan-header">
                        <Package size={18} className="ccm-plan-icon" />
                        <span className="ccm-plan-name">{item.name}</span>
                    </div>

                    <div className="ccm-plan-price">
                        <Tag size={15} className="ccm-tag-icon" />
                        <span className="ccm-price-amount">{item.price} DH</span>
                        <span className="ccm-price-period">/{item.period || 'mois'}</span>
                    </div>

                    {item.features && item.features.length > 0 && (
                        <ul className="ccm-plan-features">
                            {item.features.slice(0, 4).map((f, i) => (
                                <li key={i}>
                                    <Check size={13} className="ccm-feat-check" />
                                    <span>{f}</span>
                                </li>
                            ))}
                            {item.features.length > 4 && (
                                <li className="ccm-feat-more">+{item.features.length - 4} autres inclus</li>
                            )}
                        </ul>
                    )}
                </div>

                <div className="ccm-actions">
                    <button className="ccm-btn-cancel" onClick={onCancel}>
                        <X size={15} /> Annuler
                    </button>
                    <button className="ccm-btn-confirm" onClick={onConfirm}>
                        <ShoppingCart size={15} /> Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ConfirmCartModal;
