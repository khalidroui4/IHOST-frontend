import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import PageTransition from '../../pageTransition';

const AdminServices = () => {
    const dispatch = useDispatch();
    const { items: services, isLoading } = useSelector(state => state.services);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ nameService: '', descriptionS: '', price: 0, durationMonths: 12 });

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost/IHOST-backend/services', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('iHostToken')}` }
            });
            setShowForm(false);
            dispatch(fetchServices());
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <PageTransition>
            <div className="container-luxe" style={{ paddingTop: '150px', minHeight: '80vh', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ color: '#0B1F3A', fontWeight: 800 }}>Catalogue des Services</h1>
                    <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">+ Nouveau Service</button>
                </div>

                {showForm && (
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input placeholder="Nom du Service" value={formData.nameService} onChange={e => setFormData({...formData, nameService: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                            <textarea placeholder="Description" value={formData.descriptionS} onChange={e => setFormData({...formData, descriptionS: e.target.value})} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <input type="number" placeholder="Prix DH" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                                <input type="number" placeholder="Durée (Mois)" value={formData.durationMonths} onChange={e => setFormData({...formData, durationMonths: e.target.value})} required style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Créer</button>
                        </form>
                    </div>
                )}
                
                {isLoading ? (
                    <p>Chargement des services...</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                            <thead style={{ background: '#f8fafc', color: '#475569', fontWeight: 600, textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '1rem 1.5rem' }}>ID</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Service</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Description</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Durée</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Prix</th>
                                    <th style={{ padding: '1rem 1.5rem' }}>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map(s => (
                                    <tr key={s.idService} style={{ borderTop: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#0B1F3A' }}>#{s.idService}</td>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>{s.nameService}</td>
                                        <td style={{ padding: '1rem 1.5rem', color: '#6B7280' }}>{s.descriptionS.substring(0,50)}...</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>{s.durationMonths} Mois</td>
                                        <td style={{ padding: '1rem 1.5rem', fontWeight: 800 }}>{s.price} DH</td>
                                        <td style={{ padding: '1rem 1.5rem' }}>
                                            <span style={{ 
                                                background: parseInt(s.isActive) ? '#ecfdf5' : '#fef2f2', 
                                                color: parseInt(s.isActive) ? '#10b981' : '#ef4444', 
                                                padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 
                                            }}>
                                                {parseInt(s.isActive) ? 'ACTIF' : 'INACTIF'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </PageTransition>
    );
};

export default AdminServices;
