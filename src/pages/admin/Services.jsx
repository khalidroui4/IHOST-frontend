import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '../../store/slices/serviceSlice';
import ConfirmModal from '../../components/ConfirmModal';

const AdminServices = () => {
    const dispatch = useDispatch();
    const { items: services, isLoading } = useSelector(state => state.services);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [formData, setFormData] = useState({ 
        nameService: '', 
        descriptionS: '', 
        price: '', 
        durationMonths: '12',
        typeService: 'hosting'
    });

    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);

    const handleOpenModal = (service = null) => {
        if (service) {
            setFormData({
                nameService: service.nameService,
                descriptionS: service.descriptionS,
                price: service.price,
                durationMonths: service.durationMonths,
                typeService: service.typeService || 'hosting'
            });
            setIsEditing(true);
            setCurrentId(service.idService);
        } else {
            setFormData({
                nameService: '',
                descriptionS: '',
                price: '',
                durationMonths: '12',
                typeService: 'hosting'
            });
            setIsEditing(false);
            setCurrentId(null);
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEditing 
                ? `http://localhost/IHOST-backend/services/${currentId}`
                : 'http://localhost/IHOST-backend/services';
            
            const method = isEditing ? 'put' : 'post';
            
            await axios[method](url, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('iHostToken')}` }
            });
            setIsModalOpen(false);
            dispatch(fetchServices());
        } catch(err) {
            console.error(err);
        }
    };

    const handleDeleteClick = (service) => {
        setServiceToDelete(service);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!serviceToDelete) return;
        try {
            await axios.delete(`http://localhost/IHOST-backend/services/${serviceToDelete.idService}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('iHostToken')}` }
            });
            setIsDeleteModalOpen(false);
            setServiceToDelete(null);
            dispatch(fetchServices());
        } catch(err) {
            console.error(err);
        }
    };

    const serviceTypes = [
        { value: 'hosting', label: 'Hébergement Web' },
        { value: 'cloud', label: 'Cloud & VPS' },
        { value: 'email', label: 'Email Professionnel' },
        { value: 'ssl', label: 'Certificats SSL' },
        { value: 'domain', label: 'Noms de Domaine' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'multisites', label: 'Multisites' }
    ];

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ color: '#1B0606', fontWeight: 800, margin: 0 }}>Catalogue des Services</h1>
                <button 
                    onClick={() => handleOpenModal()} 
                    style={{ background: 'linear-gradient(135deg, #DC2626, #991B1B)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220,38,38,0.2)' }}
                >
                    + NOUVEAU SERVICE
                </button>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(27, 6, 6, 0.6)', backdropBlur: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ background: 'white', width: '100%', maxWidth: '550px', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                        >
                            <span style={{ fontSize: '1.5rem' }}>&times;</span>
                        </button>
                        
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1B0606', marginBottom: '1.5rem' }}>
                            {isEditing ? 'Modifier le Service' : 'Ajouter un Nouveau Service'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Nom du Service</label>
                                <input 
                                    value={formData.nameService} 
                                    onChange={e => setFormData({...formData, nameService: e.target.value})} 
                                    required 
                                    style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} 
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Catégorie / Type</label>
                                <select 
                                    value={formData.typeService}
                                    onChange={e => setFormData({...formData, typeService: e.target.value})}
                                    required
                                    style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', background: 'white' }}
                                >
                                    {serviceTypes.map(t => (
                                        <option key={t.value} value={t.value}>{t.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Description</label>
                                <textarea 
                                    value={formData.descriptionS} 
                                    onChange={e => setFormData({...formData, descriptionS: e.target.value})} 
                                    required 
                                    style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem', minHeight: '100px', resize: 'vertical' }} 
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Prix (DH)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        value={formData.price} 
                                        onChange={e => setFormData({...formData, price: e.target.value})} 
                                        required 
                                        style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} 
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Durée (Mois)</label>
                                    <input 
                                        type="number" 
                                        value={formData.durationMonths} 
                                        onChange={e => setFormData({...formData, durationMonths: e.target.value})} 
                                        required 
                                        style={{ padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }} 
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button 
                                    type="button" 
                                    onClick={() => setIsModalOpen(false)}
                                    style={{ flex: 1, padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontWeight: 700, cursor: 'pointer' }}
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit" 
                                    style={{ flex: 2, padding: '0.85rem', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #DC2626, #991B1B)', color: 'white', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(220,38,38,0.2)' }}
                                >
                                    {isEditing ? 'Mettre à jour' : 'Créer le Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <ConfirmModal 
                    title="Désactiver le service ?"
                    message={`Êtes-vous sûr de vouloir désactiver le service "${serviceToDelete?.nameService}" ?`}
                    onConfirm={confirmDelete}
                    onCancel={() => {
                        setIsDeleteModalOpen(false);
                        setServiceToDelete(null);
                    }}
                    confirmText="Désactiver"
                    cancelText="Annuler"
                    type="danger"
                />
            )}
            
            {isLoading ? (
                <p>Chargement des services...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <thead style={{ background: '#f8fafc', color: '#475569', fontWeight: 600, textAlign: 'left' }}>
                            <tr>
                                <th style={{ padding: '1.25rem 1.5rem' }}>ID</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Service</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Description</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Durée</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Prix</th>
                                <th style={{ padding: '1.25rem 1.5rem' }}>Statut</th>
                                <th style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(s => (
                                <tr key={s.idService} style={{ borderTop: '1px solid #e2e8f0' }}>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 600, color: '#1B0606' }}>#{s.idService}</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <div style={{ fontWeight: 700, color: '#1B0606' }}>{s.nameService}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>{s.typeService}</div>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
                                        {s.descriptionS.length > 60 ? s.descriptionS.substring(0, 60) + '...' : s.descriptionS}
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', color: '#64748b' }}>{s.durationMonths} Mois</td>
                                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#DC2626' }}>{s.price} DH</td>
                                    <td style={{ padding: '1.25rem 1.5rem' }}>
                                        <span style={{ 
                                            background: parseInt(s.isActive) ? '#ecfdf5' : '#fef2f2', 
                                            color: parseInt(s.isActive) ? '#10b981' : '#ef4444', 
                                            padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 
                                        }}>
                                            {parseInt(s.isActive) ? 'ACTIF' : 'INACTIF'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button 
                                                onClick={() => handleOpenModal(s)}
                                                style={{ background: '#f8fafc', border: '1px solid #e2e8f0', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f1f5f9'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#f8fafc'}
                                            >
                                                &#9998;
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteClick(s)}
                                                style={{ background: '#fef2f2', border: '1px solid #fee2e2', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', transition: 'all 0.2s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
                                                onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminServices;
