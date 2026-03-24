import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/notfound.css";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <motion.h1
        className="not-found-title"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="not-found-subtitle">Oups ! Page introuvable</h2>
        <p className="not-found-text">
          La page que vous recherchez semble avoir disparu ou n'a jamais existé.
        </p>

        <Link to="/" className="btn-home">
          <Home size={20} />
          Retour à l'accueil
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

