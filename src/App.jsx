import "bootstrap/dist/css/bootstrap.min.css";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import BackButton from "./components/BackButton";
import Home from "./pages/home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Terms from "./pages/legal/Terms";
import Privacy from "./pages/legal/Privacy";
import Pricing from "./pages/Pricing";
import AcceptableUse from "./pages/legal/AcceptableUse";
import ReportProblem from "./pages/legal/ReportProblem";
import HostingTemplate from "./pages/hebergement/HostingTemplate";
import { hostingData } from "./data/hostingData";
import { ToastProvider } from "./context/ToastContext";

// Domaines Pages
import RegisterDomain from "./pages/domaines/RegisterDomain";
import TransferDomain from "./pages/domaines/TransferDomain";
import DomainPricing from "./pages/domaines/DomainPricing";
import WhoisLookup from "./pages/domaines/WhoisLookup";

// Email & Collaboration Pages
import ProfessionalEmail from "./pages/email/ProfessionalEmail";
import BusinessEmail from "./pages/email/BusinessEmail";

// Sécurité Pages
import SSLCertificates from "./pages/securite/SSLCertificates";

// Entreprise Pages
import Contact from "./pages/entreprise/Contact";


import Chatbot from "./components/chat/Chatbot";
import ClientLayout from "./components/client/ClientLayout";
import AdminLayout from "./components/admin/AdminLayout";
// Client Routes
import ProtectedRoute from "./components/ProtectedRoute";
import ClientDashboard from "./pages/client/Dashboard";
import ClientServices from "./pages/client/Services";
import ClientDomains from "./pages/client/Domains";
import ClientOrders from "./pages/client/Orders";
import ClientCart from "./pages/client/Cart";
import ClientCheckout from "./pages/client/Checkout";
import ClientInvoices from "./pages/client/Invoices";
import ClientSupport from "./pages/client/Support";
import ClientNotifications from "./pages/client/Notifications";
import ClientProfile from "./pages/client/Profile";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminOrders from "./pages/admin/Orders";
import AdminServices from "./pages/admin/Services";
import AdminSupport from "./pages/admin/Support";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/slices/authSlice";
import { fetchCart } from "./store/slices/cartSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('iHostToken');
    if (token) {
      dispatch(checkAuth());
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const isClientRoute = location.pathname.startsWith('/client') || location.pathname.startsWith('/admin');
  const hideNavbarRoutes = ["/welcome"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname) && !isClientRoute;

  return (
    <ToastProvider>
      {showNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes>
          {/* ... existing routes ... */}
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Auth />} />
          <Route path="/signIn" element={<Auth />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/legal/conditions" element={<Terms />} />
          <Route path="/legal/confidentialite" element={<Privacy />} />
          <Route path="/legal/utilisation-acceptable" element={<AcceptableUse />} />
          <Route path="/legal/signaler-probleme" element={<ReportProblem />} />

          {/* Hosting pages */}
          <Route path="/hebergement/mutualise" element={<HostingTemplate data={hostingData.mutualise} />} />
          <Route path="/hebergement/cloud" element={<HostingTemplate data={hostingData.cloud} />} />
          <Route path="/hebergement/ecommerce" element={<HostingTemplate data={hostingData.ecommerce} />} />
          <Route path="/hebergement/multisites" element={<HostingTemplate data={hostingData.multisites} />} />

          {/* Domaines pages */}
          <Route path="/domaines/register" element={<RegisterDomain />} />
          <Route path="/domaines/transfer" element={<TransferDomain />} />
          <Route path="/domaines/pricing" element={<DomainPricing />} />
          <Route path="/domaines/whois" element={<WhoisLookup />} />

          {/* Email & Collaboration pages */}
          <Route path="/email-collaboration/pro" element={<ProfessionalEmail />} />
          <Route path="/email-collaboration/business" element={<BusinessEmail />} />

          {/* Securite pages */}
          <Route path="/securite/ssl" element={<SSLCertificates />} />

          {/* Entreprise pages */}
          <Route path="/contact" element={<Contact />} />

          {/* Client Routes — nested under ClientLayout */}
          <Route path="/client" element={<ProtectedRoute><ClientLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="services" element={<ClientServices />} />
            <Route path="domains" element={<ClientDomains />} />
            <Route path="orders" element={<ClientOrders />} />
            <Route path="cart" element={<ClientCart />} />
            <Route path="checkout" element={<ClientCheckout />} />
            <Route path="invoices" element={<ClientInvoices />} />
            <Route path="support" element={<ClientSupport />} />
            <Route path="notifications" element={<ClientNotifications />} />
            <Route path="profile" element={<ClientProfile />} />
          </Route>

          {/* Admin Routes — nested under AdminLayout */}
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminLayout /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {!isClientRoute && <ScrollToTop />}
      {!isClientRoute && <BackButton />}
      {showNavbar && <Footer />}
      {!isClientRoute && <Chatbot />}
      
      
    </ToastProvider>
  );
}

export default App;
