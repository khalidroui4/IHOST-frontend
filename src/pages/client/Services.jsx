import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import { addToCart } from '../../store/slices/cartSlice';
import { Server, ShoppingCart } from 'lucide-react';

const ClientServices = () => {
    const dispatch = useDispatch();
    const { items: services, isLoading } = useSelector(state => state.services);

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0B1F3A' }}>Services Disponibles</h1>
                
        {isLoading ? (
            <p>Chargement des services...</p>
        ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {services.map(srv => (
                    <div key={srv.idService} style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e5eaf0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', color: '#1E6BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Server size={20} />
                        </div>
                        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0B1F3A' }}>{srv.nameService}</h3>
                        <p style={{ margin: 0, color: '#6B7280', fontSize: '0.85rem', lineHeight: 1.5, flex: 1 }}>{srv.descriptionS}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                            <span style={{ fontWeight: 800, color: '#1E6BFF', fontSize: '1.1rem' }}>{srv.price} DH</span>
                            <button
                                onClick={() => dispatch(addToCart({ idService: srv.idService, nameService: srv.nameService, price: srv.price, durationMonths: 1 }))}
                                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #1E6BFF, #0043C0)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', transition: 'opacity 0.15s' }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                            >
                                <ShoppingCart size={14} /> Ajouter
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>

    );
};

export default ClientServices;
