import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './TechPricingCard.css';

const TechPricingCard = ({ 
    name, 
    desc, 
    price, 
    period = "DH / mois", 
    features = [], 
    highlight = false, 
    badge = null, 
    buttonText = "Choisir cette offre", 
    buttonLink = "#" 
}) => {
    return (
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
                <Link to={buttonLink} className="modern-btn-choose">
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

export default TechPricingCard;
