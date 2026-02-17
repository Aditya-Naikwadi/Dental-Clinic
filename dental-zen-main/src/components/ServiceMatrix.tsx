import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SERVICES, Service } from "@/constants/services";

interface ServiceCardProps {
  service: Service;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const ServiceCard = ({ service, index, hoveredIndex, setHoveredIndex }: ServiceCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredIndex(null);
  };

  return (
    <motion.div
      className="group relative rounded-2xl glass-card p-6 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
    >
      {service.tag && (
        <motion.span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold ${service.tag === "VIP"
            ? "bg-accent/10 text-accent"
            : "bg-secondary/10 text-secondary"
            }`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
        >
          {service.tag}
        </motion.span>
      )}

      <motion.div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <service.icon className="h-6 w-6" />
      </motion.div>

      <h3 className="mb-2 text-xl font-semibold text-foreground">{service.title}</h3>
      <p className="text-muted-foreground">{service.description}</p>

      {/* Why tooltip with smooth animation */}
      <motion.div
        className="mt-4 overflow-hidden"
        initial={false}
        animate={{
          height: hoveredIndex === index ? "auto" : 0,
          opacity: hoveredIndex === index ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="rounded-xl bg-primary/5 p-4 text-sm text-muted-foreground"
          initial={{ y: -10 }}
          animate={{ y: hoveredIndex === index ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <span className="mb-1 block font-semibold text-secondary">Why this matters</span>
          {service.why}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceMatrix = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-background" id="services">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            Our Services
          </motion.span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Advanced Care, <span className="text-gradient-teal">Personalized for You</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every treatment is backed by AI-driven precision and decades of clinical expertise.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceMatrix;
