import React from 'react';
import { Check, X } from 'lucide-react';

const PasswordStrength = ({ password }) => {
    const rules = [
        { label: 'Au moins 8 caractères', regex: /.{8,}/ },
        { label: 'Une majuscule', regex: /[A-Z]/ },
        { label: 'Un chiffre', regex: /[0-9]/ },
        { label: 'Un caractère spécial', regex: /[^A-Za-z0-9]/ }
    ];

    return (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: '#0B1F3A' }}>Règles de sécurité :</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {rules.map((rule, i) => {
                    const isMet = rule.regex.test(password);
                    return (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: isMet ? '#10B981' : '#94A3B8' }}>
                            {isMet ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                            <span>{rule.label}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default PasswordStrength;
