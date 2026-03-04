import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import NotFound from "./components/NotFound";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<Auth />} />
          <Route path="/signIn" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <ScrollToTop />
    </>

  );
}

export default App;
