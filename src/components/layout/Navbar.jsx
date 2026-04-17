import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FileText, History, LogOut, User, Menu, X } from "lucide-react";
import Button from "../common/Button";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Activity", path: "/activity", icon: History },
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsMenuOpen(false)}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
              <FileText className="text-white w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight">Nebula</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:text-white"
              >
                <div className="flex items-center gap-2 relative z-10">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-3 px-3 py-1.5 glass rounded-xl">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <div className="hidden lg:block shrink-0">
              <p className="text-xs font-medium text-white truncate max-w-[100px]">{user.name || user.email}</p>
              <p className="text-[10px] text-gray-500 capitalize">{user.role || "Viewer"}</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 p-2"
                onClick={logout}
            >
                <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 px-6 py-8 glass rounded-3xl flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              <p className="text-[10px] uppercase tracking-widest font-black text-gray-500 px-4 mb-2">Navigation</p>
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-colors ${
                    location.pathname === item.path ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-bold text-lg">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="h-px bg-white/5 w-full" />

            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 px-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{user.name || user.email}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role || "Viewer"}</p>
                  </div>
               </div>
               <Button 
                variant="ghost" 
                onClick={logout}
                className="w-full justify-start gap-4 px-4 py-4 text-red-400 hover:bg-red-500/10 hover:text-red-500"
               >
                 <LogOut className="w-5 h-5" />
                 <span className="font-bold">Sign Out</span>
               </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}