import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../store/slices/orderSlice';
import { fetchCart } from '../../store/slices/cartSlice';
import { processPayment } from '../../store/slices/paymentSlice';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';

const Checkout = () => {
    const { items: cart, total: cartTotal } = useSelector(state => state.cart);
    const { isLoading, success, error } = useSelector(state => state.payments);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    const finalTotal = cartTotal;

    const handleCheckout = async () => {
        // 1. Create Order (the backend creates the order and order_items from the native cart)
        const orderRes = await dispatch(createOrder({ totalAmount: finalTotal }));
        if (orderRes.payload?.status === 'success') {
            const orderId = orderRes.payload.orderId;
            
            // 2. Process Payment (the backend triggers activate_subscription automatically)
            const payRes = await dispatch(processPayment({
                orderId,
                amount: finalTotal,
                method: paymentMethod
            }));

            if (payRes.payload?.status === 'success') {
                // Refresh cart explicitly so badge updates immediately
                dispatch(fetchCart());
            }
        }
    };

    if (success) {
        return (
            <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center', background: 'white', padding: '4rem 2rem', borderRadius: '24px', border: '1px solid #e5eaf0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <CheckCircle size={80} color="#10B981" style={{ margin: '0 auto 1.5rem auto' }} />
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, margin: '0 0 1rem 0', fontSize: '2rem' }}>Paiement Réussi !</h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>Votre commande a été traitée avec succès.<br/>Vos services sont en cours d'activation.</p>
                <button 
                    onClick={() => {
                        // Reset payment state if needed or just navigate
                        navigate('/client/dashboard');
                    }} 
                    style={{ background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.2s', boxShadow: '0 4px 12px rgba(30,107,255,0.3)' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                    Aller au Tableau de Bord
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Paiement Sécurisé</h1>
            
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <ShieldCheck size={24} color="#10B981" />
                    <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#0B1F3A' }}>Méthode de Paiement</h3>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div 
                        onClick={() => setPaymentMethod('credit_card')}
                        style={{ flex: 1, padding: '1.5rem', border: paymentMethod === 'credit_card' ? '2px solid #1E6BFF' : '1px solid #e5eaf0', borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', background: paymentMethod === 'credit_card' ? '#f0f7ff' : '#fff', transition: 'all 0.2s' }}
                    >
                        <CreditCard size={32} color={paymentMethod === 'credit_card' ? '#1E6BFF' : '#94a3b8'} />
                        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: paymentMethod === 'credit_card' ? '#1E6BFF' : '#475569' }}>Carte Bancaire</span>
                    </div>
                    <div 
                        onClick={() => setPaymentMethod('paypal')}
                        style={{ flex: 1, padding: '1.5rem', border: paymentMethod === 'paypal' ? '2px solid #1E6BFF' : '1px solid #e5eaf0', borderRadius: '12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: paymentMethod === 'paypal' ? '#f0f7ff' : '#fff', transition: 'all 0.2s' }}
                    >
                        <span style={{ fontWeight: 800, fontSize: '1.4rem', color: paymentMethod === 'paypal' ? '#1E6BFF' : '#94a3b8' }}>PayPal</span>
                    </div>
                </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e5eaf0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 500 }}>Montant total</span>
                    <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0B1F3A', letterSpacing: '-1px' }}>{finalTotal.toFixed(2)} <span style={{ fontSize: '1.2rem', color: '#64748b' }}>DH</span></span>
                </div>
                <button 
                    onClick={handleCheckout} 
                    disabled={isLoading || cart.length === 0}
                    style={{ background: (isLoading || cart.length === 0) ? '#cbd5e1' : 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '1.1rem 2.5rem', borderRadius: '12px', fontSize: '1.05rem', fontWeight: 700, cursor: (isLoading || cart.length === 0) ? 'not-allowed' : 'pointer', transition: 'all 0.2s', boxShadow: (isLoading || cart.length === 0) ? 'none' : '0 4px 12px rgba(30,107,255,0.3)' }}
                    onMouseEnter={e => { if(!isLoading && cart.length > 0) e.currentTarget.style.opacity = '0.9' }}
                    onMouseLeave={e => { if(!isLoading && cart.length > 0) e.currentTarget.style.opacity = '1' }}
                >
                    {isLoading ? 'Traitement en cours...' : 'Confirmer le paiement'}
                </button>
            </div>
            {error && <p style={{ color: '#ef4444', margin: '0', textAlign: 'center', fontWeight: 600 }}>Erreur: {error}</p>}
        </div>
    );
};

export default Checkout;
