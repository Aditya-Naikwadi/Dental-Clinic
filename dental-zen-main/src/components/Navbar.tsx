import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ onBook }: { onBook?: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Memoize sections array to avoid recalculating on every scroll
  const sections = useMemo(() => navLinks.map(link => link.href.substring(1)), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass-card-elevated border-b border-border/50 py-3" : "py-5 bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <motion.a
          href="#"
          className="flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={`text-2xl font-bold font-display ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            Dental<span className="text-secondary">Clinic</span>
          </span>
        </motion.a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <motion.a
                key={link.label}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground/80"
                  }`}
                whileHover={{ y: -2 }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {!isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            );
          })}
          <motion.button
            onClick={onBook}
            className="flex items-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(20, 184, 166, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-4 w-4" />
            Book Now
          </motion.button>
        </nav>

        {/* Mobile toggle */}
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/50 bg-card/95 backdrop-blur-lg md:hidden"
          >
            <motion.div
              className="container mx-auto flex flex-col gap-4 px-4 py-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 }
                }
              }}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-medium text-foreground"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setMobileOpen(false); onBook?.(); }}
                className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-3 font-semibold text-secondary-foreground"
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: 20, opacity: 0 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar className="h-4 w-4" />
                Book Now
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
