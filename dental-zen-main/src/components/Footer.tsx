import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Mail, Heart, AlertTriangle, ExternalLink } from "lucide-react";

const quickLinks = [
  { label: "General Dentistry", href: "#services" },
  { label: "Cosmetic Services", href: "#services" },
  { label: "AI Diagnostics", href: "#services" },
  { label: "Patient Reviews", href: "#reviews" },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Emergency banner with pulse animation */}
      <motion.div
        className="bg-destructive/90 py-3"
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(239, 68, 68, 0)",
            "0 0 0 8px rgba(239, 68, 68, 0.1)",
            "0 0 0 0 rgba(239, 68, 68, 0)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="container mx-auto flex items-center justify-center gap-3 px-4 text-center text-sm font-medium text-destructive-foreground">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <AlertTriangle className="h-4 w-4" />
          </motion.div>
          <span>Dental Emergency? Call us 24/7:</span>
          <motion.a
            href="tel:+1234567890"
            className="font-bold underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            (123) 456-7890
          </motion.a>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-2xl font-bold font-display">
              Dental<span className="text-secondary">Clinic</span>
            </h3>
            <p className="mb-6 text-primary-foreground/60">
              Where clinical excellence meets luxury care. Your smile deserves the future of dentistry.
            </p>
            <motion.div
              className="flex items-center gap-2 text-sm text-primary-foreground/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-destructive" />
              </motion.div>
              <span>Trusted by 15,000+ patients</span>
            </motion.div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="mb-4 font-semibold text-secondary">Services</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <motion.a
                    href={link.href}
                    className="group flex items-center gap-2 text-primary-foreground/60 transition-colors hover:text-secondary"
                    whileHover={{ x: 5 }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="mb-4 font-semibold text-secondary">Contact</h4>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start gap-3 text-primary-foreground/60"
                whileHover={{ x: 5 }}
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span>123 Medical Center Dr, Suite 100<br />Beverly Hills, CA 90210</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-primary-foreground/60"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-4 w-4 shrink-0 text-secondary" />
                <a href="tel:+1234567890" className="hover:text-secondary transition-colors">(123) 456-7890</a>
              </motion.li>
              <motion.li
                className="flex items-center gap-3 text-primary-foreground/60"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-4 w-4 shrink-0 text-secondary" />
                <a href="mailto:info@dentalclinic.com" className="hover:text-secondary transition-colors">info@dentalclinic.com</a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h4 className="mb-4 font-semibold text-secondary">Hours</h4>
            <ul className="space-y-2 text-primary-foreground/60">
              <li className="flex justify-between">
                <span>Mon – Fri</span>
                <span>8:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>Emergency Only</span>
              </li>
            </ul>
            <motion.div
              className="mt-4 flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-2 text-sm text-secondary"
              whileHover={{ scale: 1.02 }}
            >
              <Clock className="h-4 w-4" />
              <span>24/7 Emergency Line</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          className="mt-12 overflow-hidden rounded-xl border border-primary-foreground/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.01 }}
        >
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7!2d-118.4!3d34.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzEyLjAiTiAxMTjCsDI0JzAwLjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
            className="h-48 w-full grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.div
          className="mt-12 border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© 2026 DentalClinic. All rights reserved. | HIPAA Compliant | ADA Certified</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
