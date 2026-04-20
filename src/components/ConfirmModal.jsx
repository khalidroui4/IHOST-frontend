import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X, Check, AlertTriangle } from 'lucide-react';
import './ConfirmModal.css';

const ConfirmModal = ({ 
    title = 'Confirmer', 
    message = 'Voulez-vous vraiment continuer ?', 
    onConfirm, 
    onCancel, 
    confirmText = 'Confirmer', 
    cancelText = 'Annuler',
    type = 'info',
    theme = 'light',
    hideIcon = false,
    hideClose = false
}) => {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onCancel(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = 'unset';
        };
    }, [onCancel]);

    const getIcon = () => {
        switch (type) {
            case 'danger': return <X size={32} />;
            case 'warning': return <AlertTriangle size={32} />;
            default: return <HelpCircle size={32} />;
        }
    };

    const modalContent = (
        <div className={`cm-backdrop cm-theme-${theme}`} onClick={onCancel}>
            <div className={`cm-panel cm-type-${type}`} onClick={e => e.stopPropagation()}>
                {(!hideClose && type !== 'logout') && (
                    <button className="cm-close" onClick={onCancel} aria-label="Fermer">
                        <X size={18} />
                    </button>
                )}

                {(!hideIcon && type !== 'logout') && (
                    <div className="cm-icon-wrap">
                        {getIcon()}
                    </div>
                )}

                <h2 className="cm-title">{title}</h2>
                <p className="cm-subtitle">{message}</p>

                <div className="cm-actions">
                    <button className={type === 'logout' ? "cm-btn-logout-confirm" : `cm-btn-confirm cm-btn-${type}`} onClick={onConfirm}>
                        {confirmText}
                    </button>
                    <button className={type === 'logout' ? "cm-btn-logout-cancel" : "cm-btn-cancel"} onClick={onCancel}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ConfirmModal;
