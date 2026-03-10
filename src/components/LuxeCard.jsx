import React from 'react';
import './LuxeCard.css';

const LuxeCard = ({
    icon: Icon,
    title,
    desc,
    variant = "white",
    padding = "3rem 2.5rem",
    children
}) => {
    return (
        <div 
            className={`luxe-card-container variant-${variant}${children ? ' has-children' : ''}`} 
            style={padding !== "3rem 2.5rem" ? { padding } : {}}
        >
            <div className="tech-border-corner" />

            {Icon && (
                <div className="luxe-card-icon">
                    <Icon size={40} strokeWidth={1.5} />
                </div>
            )}

            <h3 className="font-tech luxe-card-title">
                {title}
            </h3>

            <p className="luxe-card-desc">
                {desc}
            </p>

            {children && (
                <div style={{ marginTop: 'auto' }}>
                    {children}
                </div>
            )}

            <div className="tech-grid-overlay" />
        </div>
    );
};

export default LuxeCard;
