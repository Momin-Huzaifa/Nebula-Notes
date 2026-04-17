import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export default function Toast({ message, type = "success", isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
    error: <AlertCircle className="w-5 h-5 text-red-400" />,
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 glass rounded-2xl shadow-2xl border border-white/10"
        >
          {icons[type]}
          <span className="text-sm font-medium text-white">{message}</span>
          <button 
            onClick={onClose}
            className="ml-2 p-1 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
