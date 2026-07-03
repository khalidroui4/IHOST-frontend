import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCart, clearCart } from '../../store/slices/cartSlice';
import { createOrder } from '../../store/slices/orderSlice';
import { processPayment, resetPaymentState } from '../../store/slices/paymentSlice';
import { 
  CreditCard, Banknote, CheckCircle, 
  Lock, ShieldCheck, ChevronRight, ArrowLeft, 
  CreditCard as CardIcon, Loader2, XCircle, 
  Download, ShoppingBag, Server, Info, ArrowRight,
  HelpCircle, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../styles/checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, total: cartTotal } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);
  const { isLoading: paymentLoading, success: paymentSuccess, error: paymentError } = useSelector(state => state.payments);

  const [logoBase64, setLogoBase64] = useState('');
  const [currentStep, setCurrentStep] = useState('shipping'); // shipping, payment, paypal_login, verification, result
  const [paymentResult, setPaymentResult] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  const [shippingData, setShippingData] = useState({
    shipping_address: '',
    city: '',
    postal_code: '',
  });

  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const [paypalData, setPaypalData] = useState({
    email: '',
    password: ''
  });

  const [selectedMethod, setSelectedMethod] = useState('credit_card');

  // Load logo as base64 for PDF invoice
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const response = await fetch('/logocircle.jpeg');
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => setLogoBase64(reader.result);
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error('Failed to load logo for PDF', err);
      }
    };
    loadLogo();
    dispatch(resetPaymentState());
  }, [dispatch]);

  // Prefill address from user location if available
  useEffect(() => {
    if (user) {
      setShippingData({
        shipping_address: user.location || '',
        city: user.city || '',
        postal_code: user.postal_code || '',
      });
    }
  }, [user]);

  const finalTotal = cartTotal;

  const nextStep = () => {
    if (currentStep === 'shipping') setCurrentStep('payment');
    else if (currentStep === 'payment') {
      if (selectedMethod === 'paypal') setCurrentStep('paypal_login');
      else setCurrentStep('verification');
    }
    else if (currentStep === 'paypal_login') setCurrentStep('verification');
  };

  const prevStep = () => {
    if (currentStep === 'payment') setCurrentStep('shipping');
    else if (currentStep === 'paypal_login') setCurrentStep('payment');
    else if (currentStep === 'verification') {
      if (selectedMethod === 'paypal') setCurrentStep('paypal_login');
      else setCurrentStep('payment');
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(' ').substring(0, 19);
  };

  const formatExpiry = (value) => {
    return value.replace(/[^0-9]/g, '').replace(/^([2-9])/, '0$1').replace(/^(1[3-9])/, '01').replace(/^([0-1][0-9])([0-9])/, '$1/$2').substring(0, 5);
  };

  const finalizeOrder = async () => {
    setIsSubmittingOrder(true);
    try {
      // 1. Create order on backend (which clears cart and returns orderId & invoiceNumber)
      const orderPayload = {
        shipping_address: shippingData.shipping_address,
        city: shippingData.city,
        postal_code: shippingData.postal_code,
        payment_method: selectedMethod
      };

      const orderRes = await dispatch(createOrder(orderPayload)).unwrap();
      
      if (orderRes.status === 'success') {
        const orderIdVal = orderRes.orderId;
        const invNumberVal = orderRes.invoiceNumber;
        setOrderId(orderIdVal);
        setInvoiceNumber(invNumberVal);

        // 2. Process payment on backend
        const paymentPayload = {
          orderId: orderIdVal,
          amount: finalTotal,
          method: selectedMethod
        };
        const payRes = await dispatch(processPayment(paymentPayload)).unwrap();

        if (payRes.status === 'success') {
          const orderItems = [...items]; // Save items for PDF generation before clearing
          dispatch(fetchCart()); // refresh/clear cart
          
          setPaymentResult({
            status: 'success',
            amount: finalTotal,
            items: orderItems,
            orderId: `ORD-${orderIdVal}`,
            invoiceNumber: invNumberVal,
            txnId: `TXN-${Math.random().toString(36).toUpperCase().substring(2, 12)}`,
            date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
          });
          setCurrentStep('result');
        } else {
          setPaymentResult({ status: 'failed', message: payRes.message || 'Le paiement a échoué.' });
          setCurrentStep('result');
        }
      } else {
        setPaymentResult({ status: 'failed', message: orderRes.message || 'Erreur lors de la validation de la commande.' });
        setCurrentStep('result');
      }
    } catch (err) {
      setPaymentResult({ status: 'failed', message: err.message || 'Erreur lors de la création de la commande.' });
      setCurrentStep('result');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  const handleDownloadInvoice = () => {
    if (!paymentResult) return;

    const doc = new jsPDF();
    const primaryColor = [30, 107, 255]; // IHOST brand blue (#1E6BFF)
    
    // Background Header
    doc.setFillColor(11, 31, 58); // IHOST Navy blue (#0B1F3A)
    doc.rect(0, 0, 210, 45, 'F');

    // Branding with Logo
    if (logoBase64) {
      doc.addImage(logoBase64, 'JPEG', 20, 10, 25, 25);
    }

    // Gradient-like Canvas Title "IHOST"
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 100;
    const gradient = ctx.createLinearGradient(0, 0, 600, 0);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#1E6BFF');
    ctx.fillStyle = gradient;
    ctx.font = '900 80px sans-serif';
    ctx.fillText('IHOST', 0, 80);
    const textDataUrl = canvas.toDataURL('image/png');
    doc.addImage(textDataUrl, 'PNG', 50, 12, 50, 18);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('FACTURE OFFICIELLE', 150, 25);

    // Order Info Details
    doc.setTextColor(11, 31, 58);
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(`N° Facture: ${paymentResult.invoiceNumber}`, 20, 60);
    doc.setFont(undefined, 'normal');
    doc.text(`N° Commande: ${paymentResult.orderId}`, 20, 67);
    doc.text(`Transaction: ${paymentResult.txnId}`, 20, 74);
    doc.text(`Date: ${paymentResult.date}`, 20, 81);

    doc.setFont(undefined, 'bold');
    doc.text('Adresse de facturation:', 120, 60);
    doc.setFont(undefined, 'normal');
    doc.text(shippingData.shipping_address || 'Non spécifiée', 120, 67);
    doc.text(`${shippingData.city || ''} ${shippingData.postal_code || ''}`.trim() || 'Maroc', 120, 74);

    const tableRows = paymentResult.items.map(item => {
      const isDomain = item.nameService && (item.nameService.toLowerCase().includes('domaine') || !!item.nameService.match(/\.(com|ma|net|org|online|info|biz|co)\b/i));
      const labelName = isDomain ? (item.domainName || item.nameService) : `${item.nameService}${item.domainName ? ` - ${item.domainName}` : ''}`;
      const periodLabel = isDomain ? `${item.durationMonths / 12} An(s)` : `${item.durationMonths} Mois`;
      const itemUnitPrice = Number(item.price);
      const itemTotal = isDomain ? itemUnitPrice * (item.durationMonths / 12) : itemUnitPrice * item.durationMonths;

      return [
        labelName,
        periodLabel,
        `${itemUnitPrice.toLocaleString()} DH`,
        `${itemTotal.toLocaleString()} DH`
      ];
    });

    autoTable(doc, {
      startY: 95,
      head: [['Service / Domaine', 'Durée', 'Prix Unitaire', 'Total']],
      body: tableRows,
      headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 250, 252] },
      margin: { left: 20, right: 20 },
      styles: { fontSize: 9 }
    });

    const finalY = doc.lastAutoTable.finalY + 12;
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text(`Montant Total Payé:`, 120, finalY);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(`${paymentResult.amount.toLocaleString()} DH`, 170, finalY);

    // Footer
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text('Merci d\'avoir choisi IHOST - Votre partenaire hébergement et cloud.', 105, 285, { align: 'center' });

    doc.save(`Facture-${paymentResult.invoiceNumber}.pdf`);
  };

  if (items.length === 0 && currentStep !== 'result') {
    return (
      <div className="empty-cart-container">
        <div className="empty-card">
          <ShoppingBag size={64} className="empty-icon" />
          <h2>Votre panier est vide</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Ajoutez des offres d'hébergement ou enregistrez des domaines pour passer la commande.</p>
          <Link to="/pricing" className="btn btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Découvrir nos offres</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <div className="checkout-container">
        <div className="checkout-main">
          {currentStep !== 'result' && (
            <div className="checkout-stepper">
              <div className={`step-item ${['shipping', 'payment', 'paypal_login', 'verification'].includes(currentStep) ? 'active' : ''}`}>
                <div className="step-num">1</div>
                <span>Facturation</span>
              </div>
              <ChevronRight size={16} className="step-sep" />
              <div className={`step-item ${['payment', 'paypal_login', 'verification'].includes(currentStep) ? 'active' : ''}`}>
                <div className="step-num">2</div>
                <span>Paiement</span>
              </div>
              <ChevronRight size={16} className="step-sep" />
              <div className={`step-item ${['paypal_login', 'verification'].includes(currentStep) ? 'active' : ''}`}>
                <div className="step-num">3</div>
                <span>Vérification</span>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {currentStep === 'shipping' && (
              <motion.div key="shipping" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="checkout-card">
                <div className="card-header-premium">
                  <h3>Informations de Facturation</h3>
                </div>
                <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                  <div className="form-group-premium">
                    <label>Adresse de facturation</label>
                    <input 
                      type="text" 
                      placeholder="Rue, Appt, Ville..." 
                      value={shippingData.shipping_address} 
                      onChange={e => setShippingData({...shippingData, shipping_address: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group-premium">
                      <label>Ville</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Casablanca"
                        value={shippingData.city} 
                        onChange={e => setShippingData({...shippingData, city: e.target.value})} 
                        required 
                      />
                    </div>
                    <div className="form-group-premium">
                      <label>Code Postal</label>
                      <input 
                        type="text" 
                        placeholder="Ex: 20000"
                        value={shippingData.postal_code} 
                        onChange={e => setShippingData({...shippingData, postal_code: e.target.value})} 
                        required 
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.9rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600 }}>
                    Continuer vers le paiement <ChevronRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {currentStep === 'payment' && (
              <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="checkout-card">
                <div className="card-header-premium">
                  <h3>Paiement Sécurisé</h3>
                  <button className="back-link-premium" onClick={prevStep}>
                    <ArrowLeft size={16} /> Retour
                  </button>
                </div>
                
                <div className="payment-methods-grid">
                  <div className={`method-card ${selectedMethod === 'credit_card' ? 'selected' : ''}`} onClick={() => setSelectedMethod('credit_card')}>
                    <div className="method-icons">
                      <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/visa.svg" alt="Visa" />
                      <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/mastercard.svg" alt="Mastercard" />
                    </div>
                    <span>Carte Bancaire</span>
                  </div>
                  <div className={`method-card ${selectedMethod === 'paypal' ? 'selected' : ''}`} onClick={() => setSelectedMethod('paypal')}>
                    <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/paypal.svg" alt="PayPal" className="paypal-logo" />
                    <span>PayPal</span>
                  </div>
                </div>

                {selectedMethod === 'credit_card' ? (
                  <form className="card-entry-form" onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
                    <div className="form-group-premium">
                      <label>Titulaire de la carte</label>
                      <input 
                        type="text" 
                        placeholder="EX: MOHAMED ALAMI"
                        value={cardData.holder} 
                        onChange={e => setCardData({...cardData, holder: e.target.value.toUpperCase()})} 
                        required 
                      />
                    </div>
                    <div className="form-group-premium">
                      <label>Numéro de carte</label>
                      <div className="input-with-icon">
                        <CardIcon size={18} />
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000"
                          value={cardData.number} 
                          onChange={e => setCardData({...cardData, number: formatCardNumber(e.target.value)})} 
                          maxLength="19" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group-premium">
                        <label>Expiration</label>
                        <input 
                          type="text" 
                          placeholder="MM/AA"
                          value={cardData.expiry} 
                          onChange={e => setCardData({...cardData, expiry: formatExpiry(e.target.value)})} 
                          maxLength="5" 
                          required 
                        />
                      </div>
                      <div className="form-group-premium">
                        <label>CVV</label>
                        <input 
                          type="password" 
                          placeholder="123"
                          value={cardData.cvv} 
                          onChange={e => setCardData({...cardData, cvv: e.target.value.replace(/[^0-9]/g, '')})} 
                          maxLength="3" 
                          required 
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" style={{ padding: '0.9rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600 }}>
                      Payer {finalTotal.toLocaleString('fr-MA', {minimumFractionDigits: 2, maximumFractionDigits: 2})} DH
                    </button>
                  </form>
                ) : (
                  <div className="method-placeholder">
                    <p>Vous serez redirigé vers <strong>PayPal</strong> pour valider votre transaction.</p>
                    <button className="btn btn-primary btn-block" style={{ padding: '0.9rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600 }} onClick={nextStep}>
                      Continuer avec PayPal
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 'paypal_login' && (
              <motion.div key="paypal_login" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="checkout-card paypal-login-card">
                <div className="paypal-login-header">
                  <img src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/flat/paypal.svg" alt="PayPal" />
                </div>
                <div className="paypal-login-content">
                  <h3>Vérification PayPal</h3>
                  <div className="form-group-premium">
                    <label>E-mail PayPal</label>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      value={paypalData.email} 
                      onChange={e => setPaypalData({...paypalData, email: e.target.value})} 
                      required 
                    />
                  </div>
                  <div className="form-group-premium">
                    <label>Mot de passe</label>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={paypalData.password} 
                      onChange={e => setPaypalData({...paypalData, password: e.target.value})} 
                      required 
                    />
                  </div>
                  <button className="btn-paypal" onClick={nextStep}>Se connecter et Continuer</button>
                  <button className="btn-outline" onClick={prevStep} style={{ marginTop: '1rem', width: '100%', borderRadius: '50px' }}>Changer de mode</button>
                </div>
              </motion.div>
            )}

            {currentStep === 'verification' && (
              <motion.div key="verification" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="checkout-card verification-simple-card">
                <div className="verification-content">
                  <div className="alert-icon-wrap">
                    <HelpCircle size={64} color="#1E6BFF" />
                  </div>
                  <h3>Confirmation de Commande</h3>
                  <p className="verification-text">
                    Êtes-vous sûr de vouloir passer commande pour un montant de :
                    <span className="highlight-price">{finalTotal.toLocaleString('fr-MA', {minimumFractionDigits: 2, maximumFractionDigits: 2})} DH</span>
                  </p>
                  
                  <div className="verification-actions">
                    <button 
                      className="btn btn-primary btn-block" 
                      style={{ padding: '0.9rem', borderRadius: '10px' }}
                      onClick={finalizeOrder} 
                      disabled={isSubmittingOrder}
                    >
                      {isSubmittingOrder ? <Loader2 className="spinner-icon animate-spin" /> : "Oui, Confirmer et Payer"}
                    </button>
                    <button className="btn btn-outline btn-block" style={{ padding: '0.9rem', borderRadius: '10px' }} onClick={prevStep} disabled={isSubmittingOrder}>
                      Annuler
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'result' && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="checkout-card result-card">
                {paymentResult?.status === 'success' ? (
                  <>
                    <div className="success-icon-wrap">
                      <CheckCircle size={80} className="success-icon" />
                    </div>
                    <h2>Commande Confirmée !</h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem' }}>
                      Votre paiement a été traité. Vos abonnements et domaines ont été activés automatiquement.
                    </p>
                    <div className="order-summary-premium">
                      <div className="summary-item">
                        <span>N° Facture</span>
                        <strong>{paymentResult.invoiceNumber}</strong>
                      </div>
                      <div className="summary-item">
                        <span>ID Transaction</span>
                        <strong>{paymentResult.txnId}</strong>
                      </div>
                      <div className="summary-item">
                        <span>Date</span>
                        <strong>{paymentResult.date}</strong>
                      </div>
                      <div className="summary-item total">
                        <span>Montant Payé</span>
                        <strong>{paymentResult.amount.toFixed(2)} DH</strong>
                      </div>
                    </div>
                    <div className="result-actions">
                      <button className="btn btn-outline btn-block" onClick={handleDownloadInvoice}>
                        <Download size={18} /> Télécharger Facture (PDF)
                      </button>
                      <button className="btn btn-primary btn-block" onClick={() => navigate('/client/dashboard')}>
                        Aller au Tableau de Bord
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="error-icon-wrap">
                      <XCircle size={80} className="error-icon" />
                    </div>
                    <h2>Échec du paiement</h2>
                    <p className="error-message">{paymentResult?.message || "Une erreur est survenue lors de la transaction."}</p>
                    <button className="btn btn-primary btn-block" onClick={() => setCurrentStep('payment')}>
                      Réessayer
                    </button>
                    <Link to="/client/cart" className="btn btn-outline btn-block" style={{ textDecoration: 'none', marginTop: '1rem' }}>
                      Retour au panier
                    </Link>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentStep !== 'result' && (
          <div className="checkout-sidebar">
            <div className="summary-card-premium sticky">
              <div className="summary-header">
                <h3>{items.length} service{items.length > 1 ? 's' : ''}</h3>
              </div>
              <div className="summary-items-list">
                {items.map((item, idx) => {
                  const isDomain = item.nameService && (item.nameService.toLowerCase().includes('domaine') || !!item.nameService.match(/\.(com|ma|net|org|online|info|biz|co)\b/i));
                  const itemTotal = isDomain ? parseFloat(item.price) * (item.durationMonths / 12) : parseFloat(item.price) * item.durationMonths;
                  return (
                    <div key={item.idCart || idx} className="summary-product">
                      <div className="summary-product-img">
                        {isDomain ? <Globe size={20} /> : <Server size={20} />}
                      </div>
                      <div className="summary-product-info">
                        <p className="name">
                          {isDomain ? (item.domainName || item.nameService) : item.nameService}{' '}
                          <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                            {isDomain ? `(${item.durationMonths / 12} An${(item.durationMonths / 12) > 1 ? 's' : ''})` : `(${item.durationMonths} Mois)`}
                          </span>
                        </p>
                        <p className="price">{itemTotal.toLocaleString()} DH</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="summary-divider"></div>
              <div className="summary-totals">
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>{finalTotal.toLocaleString()} DH</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
