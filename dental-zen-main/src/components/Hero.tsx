import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, Sparkles, Shield, Award } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-dental.jpg";

const stats = [
  { label: "Happy Patients", value: "15,000+" },
  { label: "Years Experience", value: "20+" },
  { label: "Specialists", value: "12" },
  { label: "Success Rate", value: "99.8%" },
];

const Hero = ({ onBook }: { onBook?: () => void }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Split text into words for staggered animation
  const headlineWords = "The Future of Your Smile,".split(" ");
  const highlightText = "Managed by Intelligence";

  return (
    <section ref={ref} className="relative min-h-[80vh] sm:min-h-screen overflow-hidden bg-hero-gradient">
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={heroImage}
          alt="Modern dental clinic interior"
          className="h-full w-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      </motion.div>

      <motion.div
        className="container relative z-10 mx-auto flex min-h-screen flex-col justify-center px-4 py-20 lg:flex-row lg:items-center lg:gap-16"
        style={{ opacity }}
      >
        {/* Left: Content */}
        <motion.div
          className="flex-1 space-y-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 w-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">AI-Powered Dental Care</span>
          </motion.div>

          <h1 className="text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="text-gradient-teal inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {highlightText}
            </motion.span>
          </h1>

          <motion.p
            className="max-w-xl text-lg text-primary-foreground/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Experience next-generation dental care where AI meets clinical excellence.
            From smart diagnostics to personalized treatment plans — your perfect smile is just 60 seconds away.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.button
              onClick={onBook}
              className="group relative flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-4 text-lg font-bold text-secondary-foreground shadow-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <Calendar className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Book in 60 Seconds</span>
            </motion.button>
            <motion.button
              className="flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/20 px-8 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Shield className="h-5 w-5" />
              Virtual Consultation
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex items-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-gold" />
              <span className="text-sm text-primary-foreground/60">ADA Certified</span>
            </div>
            <div className="flex items-center gap-1 text-gold">
              {"★★★★★".split("").map((s, i) => (
                <motion.span
                  key={i}
                  className="text-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.6 + i * 0.1, duration: 0.3 }}
                >
                  {s}
                </motion.span>
              ))}
              <span className="ml-1 text-sm text-primary-foreground/60">4.9/5 (500+ Reviews)</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Stats card with floating animation */}
        <motion.div
          className="mt-12 flex-1 lg:mt-0"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="glass-card-elevated rounded-2xl p-8"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <h3 className="mb-6 text-xl font-semibold text-foreground">Why Patients Choose Us</h3>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="space-y-1 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl font-bold text-secondary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
