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
import AcceptableUse from "./pages/legal/AcceptableUse";
import ReportProblem from "./pages/legal/ReportProblem";
import HostingTemplate from "./pages/hebergement/HostingTemplate";
import { hostingData } from "./data/hostingData";

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

import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/welcome"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Auth />} />
          <Route path="/signIn" element={<Auth />} />
          <Route path="/welcome" element={<Welcome />} />

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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <ScrollToTop />
      <BackButton />
      {showNavbar && <Footer />}
    </>

  );
}

export default App;
