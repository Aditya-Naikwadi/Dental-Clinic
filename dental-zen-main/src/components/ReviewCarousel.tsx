import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "The AI diagnostic caught a small cavity my previous dentist missed for two years. The entire experience felt like visiting a luxury spa, not a dental office.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "James K.",
    rating: 5,
    text: "Booked online in under a minute. The staff was incredibly professional and the technology here is unlike anything I've seen. My veneers look absolutely perfect.",
    date: "1 month ago",
    verified: true,
  },
  {
    name: "Emily R.",
    rating: 5,
    text: "As someone with dental anxiety, this clinic changed everything. The gentle approach, combined with the sedation options, made the procedure stress-free.",
    date: "3 weeks ago",
    verified: true,
  },
  {
    name: "Michael T.",
    rating: 5,
    text: "The teeth whitening results exceeded my expectations. 8 shades brighter in under an hour! The team made the whole experience comfortable and fun.",
    date: "1 week ago",
    verified: true,
  },
  {
    name: "Lisa D.",
    rating: 5,
    text: "My kids actually WANT to go to the dentist now. The pediatric team is phenomenal — patient, kind, and so good with children. Highly recommend!",
    date: "2 months ago",
    verified: true,
  },
];

const ReviewCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  // Auto-play functionality
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const next = () => setCurrent((p) => (p + 1) % reviews.length);
  const prev = () => setCurrent((p) => (p - 1 + reviews.length) % reviews.length);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x < -50) {
      next();
    } else if (x > 50) {
      prev();
    }
  };

  return (
    <section className="py-24 bg-muted/30" id="reviews">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            Patient Stories
          </motion.span>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Trusted by <span className="text-gradient-gold">Thousands</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Real experiences from verified patients in our community.
          </p>
        </motion.div>

        <div
          className="relative mx-auto max-w-4xl"
          ref={containerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              style={{ x: dragX }}
              animate={{ x: `-${current * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  className="w-full flex-shrink-0 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: current === i ? 1 : 0.3 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="glass-card-elevated rounded-2xl p-8 md:p-12 text-center">
                    <div className="mb-4 flex justify-center gap-1">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={current === i ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                          transition={{ delay: j * 0.1, type: "spring", stiffness: 200 }}
                        >
                          <Star className="h-5 w-5 fill-gold text-gold" />
                        </motion.div>
                      ))}
                    </div>
                    <motion.p
                      className="mb-6 text-lg italic text-foreground/80 md:text-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={current === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.3 }}
                    >
                      "{review.text}"
                    </motion.p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-semibold text-foreground">{review.name}</span>
                      {review.verified && (
                        <motion.span
                          className="flex items-center gap-1 rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary"
                          initial={{ scale: 0 }}
                          animate={current === i ? { scale: 1 } : { scale: 0 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Verified Patient
                        </motion.span>
                      )}
                    </div>
                    <span className="mt-1 block text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <motion.button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all ${i === current ? "w-8 bg-secondary" : "w-2.5 bg-border"
                    }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
            <motion.button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Auto-play indicator */}
          {!isPaused && (
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Auto-playing • Hover to pause
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
