import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone } from "lucide-react";

const BookingFAB = ({ onBook }: { onBook?: () => void }) => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end"
        >
          <motion.a
            href="tel:+1234567890"
            className="flex items-center gap-2 rounded-full bg-secondary px-5 py-3 font-semibold text-secondary-foreground shadow-lg transition-all hover:shadow-[var(--shadow-glow-teal)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Phone className="h-5 w-5" />
            <span className="hidden sm:inline">Call Now</span>
          </motion.a>

          <div className="relative">
            <motion.button
              onClick={onBook}
              onHoverStart={() => setShowTooltip(true)}
              onHoverEnd={() => setShowTooltip(false)}
              className="relative flex items-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-primary-foreground shadow-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 4px 14px 0 rgba(20, 184, 166, 0.39)",
                  "0 6px 20px 0 rgba(20, 184, 166, 0.6)",
                  "0 4px 14px 0 rgba(20, 184, 166, 0.39)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <Calendar className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Book in 60 Seconds</span>
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm text-background shadow-lg"
                >
                  Quick & Easy Booking! 🚀
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingFAB;
