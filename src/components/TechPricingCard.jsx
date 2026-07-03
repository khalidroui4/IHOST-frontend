import { useState } from 'react';
import { Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { fetchDomains } from '../store/slices/domainSlice';
import ConfirmCartModal from './ConfirmCartModal';
import { useToast } from '../context/ToastContext';
import './TechPricingCard.css';

const TechPricingCard = ({ 
    idService,
    id,
    name, 
    desc, 
    price, 
    period = "DH / mois", 
    features = [], 
    highlight = false, 
    badge = null, 
    buttonText = "Choisir cette offre", 
    buttonLink = null,
 
    addToCartMode = false,
    domainName = null,
    typeService = null,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useSelector(state => state.auth);
    const { items: ownedDomains } = useSelector(state => state.domains || { items: [] });
    const { items: cart } = useSelector(state => state.cart || { items: [] });
    const [showModal, setShowModal] = useState(false);
    const { addToast } = useToast();

    const handleChooseClick = () => {
        if (!isAuthenticated) {
            addToast("Veuillez créer un compte pour choisir ce service.", "info");
            navigate('/signUp');
            return;
        }
        if (user?.role === 'admin') {
            addToast("Les administrateurs ne peuvent pas acheter de services.", "error");
            return;
        }
        if (typeService === 'hosting' || typeService === 'email') {
            dispatch(fetchDomains(user?.idU || user?.id));
        }
        setShowModal(true);
    };

    const handleConfirm = async (domainNameInput) => {
        try {
            await dispatch(addToCart({
                idService: idService || id,
                nameService: name,
                price: parseFloat(price),
                durationMonths: typeService === 'domain' ? 12 : 1,
                domainName: domainNameInput || domainName,
            })).unwrap();
            
            addToast("L'article a été ajouté à votre panier avec succès !", "success");
            setShowModal(false);
        } catch (error) {
            addToast(`Échec de l'ajout: ${error.message || "Erreur réseau"}`, "error");
            setShowModal(false);
        }
    };

    const buttonContent = addToCartMode ? (
        <button
            className="modern-btn-choose"
            onClick={handleChooseClick}
        >
            {buttonText}
        </button>
    ) : (
        <Link to={buttonLink || '#'} className="modern-btn-choose">
            {buttonText}
        </Link>
    );

    return (
        <>
            <div className={`pricing-card-modern ${highlight ? 'highlight' : ''}`}>
                {badge && highlight && (
                    <div className="modern-card-badge">{badge}</div>
                )}
                
                <div className="modern-card-header">
                    <h3 className="modern-card-name">{name}</h3>
                    {desc && <p className="modern-card-desc">{desc}</p>}
                </div>

                <div className="modern-card-price-container">
                    <span className="modern-price-from">A partir de </span>
                    <span className="modern-price-amount">{price}</span>
                    <span className="modern-price-period">{period}</span>
                </div>

                <div className="modern-card-features-wrapper">
                    <ul className="modern-card-features">
                        {features.map((feature, i) => (
                            <li key={i}>
                                <Check size={18} className="modern-check-icon" strokeWidth={3} />
                                <span className="modern-feature-text">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="modern-card-footer">
                    {buttonContent}
                </div>
            </div>

            {showModal && (
                <ConfirmCartModal
                    item={{ name, price, period, features }}
                    typeService={typeService}
                    ownedDomains={ownedDomains}
                    cartItems={cart}
                    onConfirm={handleConfirm}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default TechPricingCard;
