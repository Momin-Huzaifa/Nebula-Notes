import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, Home, ArrowLeft } from "lucide-react";
import Button from "../../components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center -mt-12 text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-12"
      >
        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
        <Compass className="w-32 h-32 text-primary relative z-10 animate-pulse" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-8xl font-display font-black text-white mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-300 mb-6">Lost in the Nebula?</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
          The page you're looking for has drifted into deep space or never existed at all.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button className="gap-2 px-8 py-3">
              <Home className="w-4 h-4" /> Return Home
            </Button>
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors py-2 px-4"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
