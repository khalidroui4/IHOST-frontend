import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from './ClientSidebar';
import './ClientLayout.css';

const ClientLayout = () => {
    return (
        <div className="client-layout">
            <ClientSidebar />
            <main className="client-content">
                <Outlet />
            </main>
        </div>
    );
};

export default ClientLayout;
