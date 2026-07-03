import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, X, Check, Package, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ConfirmCartModal.css';

const ConfirmCartModal = ({ item, typeService, ownedDomains, cartItems, onConfirm, onCancel }) => {
    const ownedNames = (ownedDomains || []).map(d => d.domainName);
    const cartDomains = (cartItems || [])
        .filter(item => {
            const isDomain = item.nameService && (item.nameService.toLowerCase().includes('domaine') || !!item.nameService.match(/\.(com|ma|net|org|online|info|biz|co)\b/i));
            return isDomain && item.domainName;
        })
        .map(item => item.domainName);

    const availableDomains = Array.from(new Set([...ownedNames, ...cartDomains]));

    const [domainInput, setDomainInput] = React.useState(
        typeService === 'cloud' 
            ? 'Ubuntu 22.04 LTS' 
            : ((typeService === 'hosting' || typeService === 'email') && availableDomains.length > 0 ? availableDomains[0] : '')
    );
    const [errorMsg, setErrorMsg] = React.useState('');

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

    // Update domainInput when availableDomains loads
    useEffect(() => {
        if ((typeService === 'hosting' || typeService === 'email') && availableDomains.length > 0 && !domainInput) {
            setDomainInput(availableDomains[0]);
        }
    }, [availableDomains, typeService, domainInput]);

    if (!item) return null;

    const handleConfirmClick = () => {
        if (typeService === 'hosting' || typeService === 'email') {
            if (availableDomains.length === 0) return;
            onConfirm(domainInput || availableDomains[0]);
        } else if (typeService === 'domain') {
            const cleaned = domainInput.trim().toLowerCase();
            if (!cleaned) {
                setErrorMsg('Ce champ est obligatoire.');
                return;
            }
            const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/i;
            if (!domainRegex.test(cleaned)) {
                setErrorMsg('Veuillez saisir un nom de domaine valide (ex: exemple.com).');
                return;
            }
            onConfirm(cleaned);
        } else if (typeService === 'cloud') {
            onConfirm(domainInput || 'Ubuntu 22.04 LTS');
        } else {
            onConfirm();
        }
    };

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

                {/* For Hosting or Email plans */}
                {(typeService === 'hosting' || typeService === 'email') && (
                    availableDomains.length === 0 ? (
                        <div style={{ marginTop: '1.5rem', textAlign: 'center', background: '#fff5f5', border: '1px solid #feb2b2', padding: '1.25rem', borderRadius: '12px', color: '#c53030' }}>
                            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.4 }}>
                                {typeService === 'hosting' 
                                    ? "Vous devez enregistrer un nom de domaine ou en avoir un dans votre panier pour pouvoir souscrire à un hébergement." 
                                    : "Vous devez enregistrer un nom de domaine ou en avoir un dans votre panier pour commander ce service email."}
                            </p>
                            <Link 
                                to="/domaines/register" 
                                onClick={onCancel}
                                style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '0.4rem', 
                                    background: '#c53030', 
                                    color: 'white', 
                                    padding: '0.6rem 1.25rem', 
                                    borderRadius: '8px', 
                                    textDecoration: 'none', 
                                    fontWeight: 700, 
                                    fontSize: '0.9rem',
                                    transition: 'background 0.2s'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#9b1c1c'}
                                onMouseLeave={e => e.currentTarget.style.background = '#c53030'}
                            >
                                Enregistrer un domaine <ArrowRight size={16} />
                            </Link>
                        </div>
                    ) : (
                        <div className="ccm-input-container" style={{ marginTop: '1.5rem', textAlign: 'left', width: '100%' }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#0B1F3A', marginBottom: '0.5rem' }}>
                                {typeService === 'hosting' ? 'Sélectionnez le nom de domaine à héberger :' : 'Sélectionnez le nom de domaine associé :'}
                            </label>
                            <select
                                value={domainInput || availableDomains[0]}
                                onChange={(e) => {
                                    setDomainInput(e.target.value);
                                    setErrorMsg('');
                                }}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1.7rem 0.75rem 1rem',
                                    borderRadius: '8px',
                                    border: '1px solid #cbd5e1',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    boxSizing: 'border-box',
                                    background: 'white',
                                    cursor: 'pointer',
                                    appearance: 'auto'
                                }}
                            >
                                {availableDomains.map((dom, i) => (
                                    <option key={i} value={dom}>{dom}</option>
                                ))}
                            </select>
                        </div>
                    )
                )}

                {/* For Domain registration */}
                {typeService === 'domain' && (
                    <div className="ccm-input-container" style={{ marginTop: '1.5rem', textAlign: 'left', width: '100%' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#0B1F3A', marginBottom: '0.5rem' }}>
                            Nom de domaine à enregistrer :
                        </label>
                        <input
                            type="text"
                            placeholder="ex: monentreprise.com"
                            value={domainInput}
                            onChange={(e) => {
                                setDomainInput(e.target.value);
                                setErrorMsg('');
                            }}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box'
                            }}
                            onFocus={e => e.target.style.borderColor = '#1E6BFF'}
                            onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                        />
                        {errorMsg && (
                            <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: '0.4rem 0 0 0', fontWeight: 500 }}>
                                {errorMsg}
                            </p>
                        )}
                    </div>
                )}

                {/* For Cloud services */}
                {typeService === 'cloud' && (
                    <div className="ccm-input-container" style={{ marginTop: '1.5rem', textAlign: 'left', width: '100%' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#0B1F3A', marginBottom: '0.5rem' }}>
                            Système d'exploitation (OS) :
                        </label>
                        <select
                            value={domainInput || 'Ubuntu 22.04 LTS'}
                            onChange={(e) => {
                                setDomainInput(e.target.value);
                            }}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1.7rem 0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid #cbd5e1',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                boxSizing: 'border-box',
                                background: 'white',
                                cursor: 'pointer',
                                appearance: 'auto'
                            }}
                        >
                            <option value="Ubuntu 22.04 LTS">Ubuntu 22.04 LTS</option>
                            <option value="Debian 12">Debian 12</option>
                            <option value="CentOS Stream 9">CentOS Stream 9</option>
                            <option value="Rocky Linux 9">Rocky Linux 9</option>
                            <option value="Windows Server 2022">Windows Server 2022</option>
                        </select>
                    </div>
                )}

                <div className="ccm-actions">
                    <button className="ccm-btn-cancel" onClick={onCancel}>
                        <X size={15} /> Annuler
                    </button>
                    {(!((typeService === 'hosting' || typeService === 'email') && availableDomains.length === 0)) && (
                        <button className="ccm-btn-confirm" onClick={handleConfirmClick}>
                            <ShoppingCart size={15} /> Ajouter au panier
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ConfirmCartModal;
