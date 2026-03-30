import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import ConfirmModal from './ConfirmModal';

const LogoutConfirmModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();

    if (!isOpen) return null;

    return (
        <ConfirmModal 
            title="Se déconnecter ?"
            message="Voulez-vous vraiment vous déconnecter de votre compte IHOST ?"
            onConfirm={() => { 
                dispatch(logout()); 
                window.location.href = '/'; 
            }}
            onCancel={onClose}
            confirmText="Se déconnecter"
            cancelText="Rester"
            type="danger"
        />
    );
};

export default LogoutConfirmModal;
