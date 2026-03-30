import { useState } from 'react';
import { Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import ConfirmCartModal from './ConfirmCartModal';
import { useToast } from '../context/ToastContext';
import './TechPricingCard.css';

const TechPricingCard = ({ 
    idService,
    name, 
    desc, 
    price, 
    period = "DH / mois", 
    features = [], 
    highlight = false, 
    badge = null, 
    buttonText = "Choisir cette offre", 
    buttonLink = null,
    // When true the button opens a confirm-then-add-to-cart modal
    // instead of navigating with buttonLink
    addToCartMode = false,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);
    const [showModal, setShowModal] = useState(false);
    const { addToast } = useToast();

    const handleChooseClick = () => {
        if (!isAuthenticated) {
            addToast("Veuillez créer un compte pour choisir ce service.", "info");
            navigate('/signUp');
            return;
        }
        setShowModal(true);
    };

    const handleConfirm = async () => {
        try {
            await dispatch(addToCart({
                idService,
                nameService: name,
                price: parseFloat(price),
                durationMonths: 1,
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
                    onConfirm={handleConfirm}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default TechPricingCard;
