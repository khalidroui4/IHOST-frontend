import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../../store/slices/orderSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { processPayment } from '../../store/slices/paymentSlice';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../../pageTransition';
import { CreditCard, CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { items: cart, total: cartTotal } = useSelector(state => state.cart);
    const { isLoading, success, error } = useSelector(state => state.payments);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    const totalTTC = cartTotal * 1.20;

    const handleCheckout = async () => {
        // 1. Create Order
        const orderRes = await dispatch(createOrder({ totalAmount: totalTTC }));
        if (orderRes.payload?.status === 'success') {
            const orderId = orderRes.payload.orderId;
            // 2. Process Payment
            // For prototype, we just pass the first service in the cart to activate it
            const serviceId = cart.length > 0 ? cart[0].idService : null;
            
            const payRes = await dispatch(processPayment({
                orderId,
                amount: totalTTC,
                method: paymentMethod,
                serviceId // allows backend to invoke activate_subscription
            }));

            if (payRes.payload?.status === 'success') {
                dispatch(clearCart());
            }
        }
    };

    if (success) {
        return (
            <PageTransition>
                <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', textAlign: 'center' }}>
                    <CheckCircle size={80} color="#10B981" style={{ margin: '0 auto 2rem auto' }} />
                    <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '1rem' }}>Paiement Réussi !</h1>
                    <p style={{ color: '#6B7280', fontSize: '1.2rem', marginBottom: '3rem' }}>Votre commande a été traitée et votre service est en cours d'activation.</p>
                    <button onClick={() => navigate('/client/dashboard')} className="btn btn-primary">Aller au Tableau de Bord</button>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ color: '#0B1F3A', fontWeight: 800, marginBottom: '2rem' }}>Paiement Sécurisé</h1>
                
                <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0B1F3A', marginBottom: '1.5rem' }}>Méthode de Paiement</h3>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div 
                            onClick={() => setPaymentMethod('credit_card')}
                            style={{ flex: 1, padding: '1.5rem', border: paymentMethod === 'credit_card' ? '2px solid #1E6BFF' : '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: paymentMethod === 'credit_card' ? '#f0f7ff' : '#fff' }}
                        >
                            <CreditCard size={32} color={paymentMethod === 'credit_card' ? '#1E6BFF' : '#6B7280'} />
                            <span style={{ fontWeight: 600, color: paymentMethod === 'credit_card' ? '#1E6BFF' : '#4B5563' }}>Carte Bancaire</span>
                        </div>
                        <div 
                            onClick={() => setPaymentMethod('paypal')}
                            style={{ flex: 1, padding: '1.5rem', border: paymentMethod === 'paypal' ? '2px solid #1E6BFF' : '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: paymentMethod === 'paypal' ? '#f0f7ff' : '#fff' }}
                        >
                            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: paymentMethod === 'paypal' ? '#1E6BFF' : '#6B7280' }}>PayPal</span>
                        </div>
                    </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <span style={{ color: '#4B5563', display: 'block', marginBottom: '0.2rem' }}>Montant à payer</span>
                        <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0B1F3A' }}>{totalTTC.toFixed(2)} DH</span>
                    </div>
                    <button 
                        className="btn btn-primary" 
                        onClick={handleCheckout} 
                        disabled={isLoading || cart.length === 0}
                        style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}
                    >
                        {isLoading ? 'Traitement...' : 'Confirmer le paiement'}
                    </button>
                </div>
                {error && <p style={{ color: '#EF4444', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
            </div>
        </PageTransition>
    );
};

export default Checkout;
