import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const Captcha = ({ onVerify }) => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [isVerified, setIsVerified] = useState(false);

    const generateCode = () => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCode(result);
        setIsVerified(false);
        setInput('');
        onVerify(false);
    };

    useEffect(() => {
        generateCode();
    }, []);

    const handleChange = (e) => {
        const val = e.target.value.toUpperCase();
        setInput(val);
        if (val === code) {
            setIsVerified(true);
            onVerify(true);
        } else {
            setIsVerified(false);
            onVerify(false);
        }
    };

    return (
        <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: '#F1F5F9', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ 
                    fontFamily: '"Courier New", Courier, monospace', 
                    fontSize: '1.5rem', 
                    fontWeight: 900, 
                    letterSpacing: '5px', 
                    background: 'white', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '8px', 
                    border: '1px dashed #94A3B8',
                    userSelect: 'none',
                    color: '#0B1F3A',
                    textDecoration: 'line-through'
                }}>
                    {code}
                </div>
                <button 
                    type="button"
                    onClick={generateCode}
                    style={{ background: 'none', border: 'none', color: '#1E6BFF', cursor: 'pointer' }}
                    title="Actualiser"
                >
                    <RefreshCw size={20} />
                </button>
            </div>
            <input 
                type="text" 
                placeholder="Entrez le code ci-dessus" 
                value={input}
                onChange={handleChange}
                disabled={isVerified}
                style={{ 
                    width: '100%', 
                    padding: '0.75rem', 
                    borderRadius: '8px', 
                    border: `2px solid ${isVerified ? '#10B981' : '#CBD5E1'}`, 
                    outline: 'none',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '1rem'
                }} 
            />
            {isVerified && <p style={{ color: '#10B981', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.5rem', textAlign: 'center' }}>Vérification réussie !</p>}
        </div>
    );
};

export default Captcha;
