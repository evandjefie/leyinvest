import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import LeyButton from "@/components/ui/LeyButton";
import logoLeycom from '@/assets/logo_leycom.svg';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-background p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8 max-w-md mx-auto"
      >
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={logoLeycom} alt="LeyInvest" className="h-12" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">Page non trouvée</h2>
          <p className="text-white/80">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <LeyButton className="bg-white text-primary hover:bg-white/90 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Accueil
            </LeyButton>
          </Link>
          <LeyButton 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-white hover:bg-white/10 border border-white/20 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </LeyButton>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
