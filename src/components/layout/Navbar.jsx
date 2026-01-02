import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiSparkles, HiArrowRight } from "react-icons/hi";

// Mock auth store for demo - replace with your actual store
const useAuthStore = () => ({
  isAuthenticated: false,
  user: null
});

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Templates", href: "/templates" },
    { name: "Showcase", href: "/showcase" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-1">
            <div className="flex items-center">
              <span className="text-3xl font-[900] tracking-tighter text-black">l</span>
              <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
                <motion.div 
                  className="w-full h-full rounded-full border-[4px] border-black"
                  animate={{ 
                    borderRadius: ["50%", "30%", "50%"],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="relative w-5 h-5 flex items-center justify-center mx-[1px]">
                <motion.div 
                  className="w-full h-full rounded-full border-[4px] border-black"
                  animate={{ 
                    rotate: 360
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
              </div>
              <span className="text-3xl font-[900] tracking-tighter text-black">mo</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  to={item.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm font-semibold text-black hover:text-gray-600 transition-colors">
                  Dashboard
                </Link>
                <Link to="/dashboard/projects/new">
                  <motion.button
                    className="px-6 py-2.5 bg-yellow-400 text-black text-sm font-bold rounded-full hover:bg-yellow-500 transition-all shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Create Video
                  </motion.button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-black hover:text-gray-600 transition-colors">
                  Log in
                </Link>
                <Link to="/showcase">
                  <motion.button
                    className="px-6 py-2.5 border border-gray-300 text-black text-sm font-bold rounded-full hover:bg-gray-50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get a demo
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    className="px-6 py-2.5 bg-yellow-400 text-black text-sm font-bold rounded-full hover:bg-yellow-500 transition-all shadow-md"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign up for free
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white/50 text-black hover:text-slate-700 hover:border-slate-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiX className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMenu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Link
                    to={item.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive(item.href)
                        ? "bg-slate-100 text-black shadow-sm"
                        : "text-gray-500 hover:text-black hover:bg-slate-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Auth Buttons */}
              <motion.div
                className="pt-4 space-y-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full px-4 py-3 text-sm font-semibold text-black hover:bg-slate-50 transition-all text-left">
                        Dashboard
                      </button>
                    </Link>
                    <Link
                      to="/dashboard/projects/new"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full px-4 py-3 bg-yellow-400 text-black text-sm font-bold rounded-full hover:bg-yellow-500 transition-all shadow-sm">
                        Create Video
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full px-4 py-3 text-sm font-semibold text-black hover:bg-slate-50 transition-all text-left">
                        Log in
                      </button>
                    </Link>
                    <Link
                      to="/showcase"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full px-4 py-3 border border-gray-300 text-black text-sm font-bold rounded-full hover:bg-gray-50 transition-all">
                        Get a demo
                      </button>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <button className="w-full px-4 py-3 bg-yellow-400 text-black text-sm font-bold rounded-full hover:bg-yellow-500 transition-all shadow-md">
                        Sign up for free
                      </button>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;