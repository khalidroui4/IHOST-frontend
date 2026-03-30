# 🎯 IHOST - Cloud & Hosting Management Platform

A robust, full-stack cloud infrastructure and domain management platform built with **React + Redux** on the frontend and **PHP + MySQL** on the backend. 
The system supports two primary roles: **Client** and **Admin**, providing a complete SaaS experience from service discovery to administrative provisioning.

## 🚀 Features

### 👤 Client
*   **Authentication**: Secure registration, login, and profile management.
*   **Service Discovery**: Browse dynamic hosting plans (Shared, Cloud, E-commerce, Multisites).
*   **Domain Management**: Real-time domain availability search and dynamic extensions pricing.
*   **Shopping Cart**: Add multiple hosting plans, domains, and SSL certificates to a cart with confirmation modals.
*   **Client Dashboard**: Dedicated portal to view active services, pending orders, and manage invoices.
*   **Support System**: Open, track, and reply to support tickets directly from the dashboard.

### 🛡️ Admin
*(Includes all Client features +)*
*   **Admin Dashboard**: Comprehensive overview with real-time platform statistics, user metrics, and revenue tracking.
*   **Dynamic Service Management (CRUD)**: Create, edit, and delete hosting packages, domain extensions, and SSL certificates. Changes sync instantly to the public website without coding.
*   **User Management**: View client profiles, monitor activity, and manage access.
*   **Order Fulfillment**: Review, approve, or reject new client purchases.
*   **Support Desk**: Centralized inbox to respond to client support tickets and resolve issues.

## 🔒 Security Hardening
*   **Secure Authentication**: Token-based architecture verifying roles and sessions.
*   **Role-Based Access Control (RBAC)**: Strict frontend `ProtectedRoute` wrappers preventing unauthorized access to admin or client portals.
*   **Action Confirmations**: Reusable modals for destructive actions (e.g., deleting a service, logging out, removing cart items) to prevent accidental data loss.
*   **Backend Protection**: Prepared Statements via PDO to prevent SQL Injection (SQLi) and robust input validation.

## 🧱 Tech Stack

**Frontend**
*   React (Vite)
*   Redux Toolkit (State Management)
*   React Router DOM (Routing)
*   Lucide React (Icons)
*   Axios (API Client)
*   Custom CSS (Premium UI with Glassmorphism and dynamic animations)

**Backend**
*   PHP (REST-style API Architecture)
*   MySQL (Relational Database)
*   PDO (Secure Database Access)

## 📁 Project Structure

```text
IHOST-frontend/
│
├── src/
│   ├── components/
│   │   ├── admin/           # Admin-specific layout and sidebar components
│   │   ├── client/          # Client-specific layout and sidebar components
│   │   ├── ConfirmModal.jsx # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── data/                # Static navigation and structure data
│   │
│   ├── pages/
│   │   ├── admin/           # Admin Dashboard, Orders, Services, Support, Users
│   │   ├── client/          # Client Dashboard, Cart, Checkout, Profile
│   │   ├── domaines/        # Domain Registration, Pricing, Transfer, WHOIS
│   │   ├── hebergement/     # Shared, Cloud, and Special Hosting templates
│   │   ├── auth/            # Signin, Signup
│   │   ├── Pricing.jsx      # Dynamic main pricing page
│   │   └── home.jsx         # Landing page
│   │
│   ├── store/
│   │   ├── slices/          # Redux slices (auth, cart, services, tickets)
│   │   └── store.js
│   │
│   ├── index.css            # Global modern styles and tokens
│   └── App.jsx              # Main routing and layout wrapper
│
└── package.json
```

```text
IHOST-backend/
│
├── controllers/             # PHP API endpoints (auth, services, domains, tickets)
├── config/                  # Database configuration and PDO setup
├── middleware/              # Authentication wrappers and token verification
├── database.sql             # Complete database schema and initial active services
└── index.php                # API entry point and router
```

## ⚙️ Installation

1. **Clone the repository**
   *(Update with your actual repository links)*
   ```bash
   git clone https://github.com/your-username/ihost-frontend.git 
   git clone https://github.com/your-username/ihost-backend.git
   ```

2. **Backend Setup (PHP/MySQL)**
   *   Import `database.sql` into your local MySQL server (e.g., via phpMyAdmin).
   *   Update `config/db.php` with your database credentials.
   *   Ensure the backend is served locally (e.g., at `http://localhost/IHOST-backend`).

3. **Frontend Setup (React/Vite)**
   ```bash
   cd ihost-frontend
   npm install
   npm run dev
   ```
   *The application will launch on your local host (usually `http://localhost:5173`).*
