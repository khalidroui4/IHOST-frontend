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
import DomainProtection from "./pages/domaines/DomainProtection";
import PremiumDomains from "./pages/domaines/PremiumDomains";
import ResellerDomains from "./pages/domaines/ResellerDomains";

// Email & Collaboration Pages
import ProfessionalEmail from "./pages/email/ProfessionalEmail";
import BusinessEmail from "./pages/email/BusinessEmail";
import GoogleWorkspace from "./pages/email/GoogleWorkspace";
import Microsoft365 from "./pages/email/Microsoft365";
import AntiSpam from "./pages/email/AntiSpam";
import EmailSecurity from "./pages/email/EmailSecurity";
import EmailArchiving from "./pages/email/EmailArchiving";

// Sécurité Pages
import SSLCertificates from "./pages/securite/SSLCertificates";
import WildcardSSL from "./pages/securite/WildcardSSL";
import EVSSL from "./pages/securite/EVSSL";
import CodeSigning from "./pages/securite/CodeSigning";
import SiteLock from "./pages/securite/SiteLock";
import DDoSProtection from "./pages/securite/DDoSProtection";
import FirewallWAF from "./pages/securite/FirewallWAF";
import MalwareProtection from "./pages/securite/MalwareProtection";
import SecurityMonitoring from "./pages/securite/SecurityMonitoring";

// Web & Marketing Pages
import WebsiteBuilder from "./pages/marketing/WebsiteBuilder";
import WebDevelopment from "./pages/marketing/WebDevelopment";
import SEO from "./pages/marketing/SEO";
import GoogleAds from "./pages/marketing/GoogleAds";
import DigitalMarketing from "./pages/marketing/DigitalMarketing";
import BrandProtection from "./pages/marketing/BrandProtection";

// Entreprise Pages
import AboutUs from "./pages/entreprise/AboutUs";
import DataCenters from "./pages/entreprise/DataCenters";
import Partners from "./pages/entreprise/Partners";
import Careers from "./pages/entreprise/Careers";
import Blog from "./pages/entreprise/Blog";
import Press from "./pages/entreprise/Press";
import Certifications from "./pages/entreprise/Certifications";
import LegalDocuments from "./pages/entreprise/LegalDocuments";
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
          <Route path="/domaines/protection" element={<DomainProtection />} />
          <Route path="/domaines/premium" element={<PremiumDomains />} />
          <Route path="/domaines/reseller" element={<ResellerDomains />} />

          {/* Email & Collaboration pages */}
          <Route path="/email-collaboration/pro" element={<ProfessionalEmail />} />
          <Route path="/email-collaboration/business" element={<BusinessEmail />} />
          <Route path="/email-collaboration/google-workspace" element={<GoogleWorkspace />} />
          <Route path="/email-collaboration/microsoft-365" element={<Microsoft365 />} />
          <Route path="/email-collaboration/anti-spam" element={<AntiSpam />} />
          <Route path="/email-collaboration/security" element={<EmailSecurity />} />
          <Route path="/email-collaboration/archiving" element={<EmailArchiving />} />

          {/* Securite pages */}
          <Route path="/securite/ssl" element={<SSLCertificates />} />
          <Route path="/securite/wildcard" element={<WildcardSSL />} />
          <Route path="/securite/ev" element={<EVSSL />} />
          <Route path="/securite/code-signing" element={<CodeSigning />} />
          <Route path="/securite/sitelock" element={<SiteLock />} />
          <Route path="/securite/ddos" element={<DDoSProtection />} />
          <Route path="/securite/waf" element={<FirewallWAF />} />
          <Route path="/securite/malware" element={<MalwareProtection />} />
          <Route path="/securite/monitoring" element={<SecurityMonitoring />} />

          {/* Web & Marketing pages */}
          <Route path="/web-marketing/builder" element={<WebsiteBuilder />} />
          <Route path="/web-marketing/development" element={<WebDevelopment />} />
          <Route path="/web-marketing/seo" element={<SEO />} />
          <Route path="/web-marketing/ads" element={<GoogleAds />} />
          <Route path="/web-marketing/digital" element={<DigitalMarketing />} />
          <Route path="/web-marketing/brand" element={<BrandProtection />} />

          {/* Entreprise pages */}
          <Route path="/entreprise/about" element={<AboutUs />} />
          <Route path="/entreprise/datacenters" element={<DataCenters />} />
          <Route path="/entreprise/partners" element={<Partners />} />
          <Route path="/entreprise/careers" element={<Careers />} />
          <Route path="/entreprise/blog" element={<Blog />} />
          <Route path="/entreprise/press" element={<Press />} />
          <Route path="/entreprise/certifications" element={<Certifications />} />
          <Route path="/entreprise/legal" element={<LegalDocuments />} />
          <Route path="/entreprise/contact" element={<Contact />} />
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
