import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  X, Check, ChevronRight, ChevronLeft, CalendarIcon,
  Smile, ScanLine, Sparkles, Heart, Shield, Zap, Trophy, Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

const services = [
  { id: "cosmetic", icon: Smile, title: "Cosmetic Dentistry", price: "From $299" },
  { id: "diagnostics", icon: ScanLine, title: "AI Diagnostics", price: "From $149" },
  { id: "whitening", icon: Sparkles, title: "Teeth Whitening", price: "From $199" },
  { id: "pediatric", icon: Heart, title: "Pediatric Care", price: "From $99" },
  { id: "implants", icon: Shield, title: "Dental Implants", price: "From $999" },
  { id: "emergency", icon: Zap, title: "Emergency Care", price: "From $249" },
];

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

const steps = [
  { label: "Service", icon: Sparkles },
  { label: "Date & Time", icon: CalendarIcon },
  { label: "Your Info", icon: Heart },
  { label: "Confirm", icon: Check },
];

interface BookingFlowProps {
  open: boolean;
  onClose: () => void;
}

const BookingFlow = ({ open, onClose }: BookingFlowProps) => {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const progress = ((step + 1) / steps.length) * 100;

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate && !!selectedTime;
    if (step === 2) return name.trim().length > 0 && phone.trim().length >= 7 && email.includes("@");
    return true;
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleSubmit = () => {
    triggerConfetti();
    toast({
      title: "🎉 Appointment Booked!",
      description: `We'll see you on ${selectedDate ? format(selectedDate, "PPP") : ""} at ${selectedTime}. A confirmation has been sent to ${email}.`,
    });

    setTimeout(() => {
      onClose();
    }, 500);

    // Reset
    setTimeout(() => {
      setStep(0);
      setSelectedService(null);
      setSelectedDate(undefined);
      setSelectedTime(null);
      setName("");
      setPhone("");
      setEmail("");
      setNotes("");
    }, 800);
  };

  const selectedServiceData = services.find((s) => s.id === selectedService);


  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg rounded-2xl bg-card shadow-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
          >
            {/* Header */}
            <div className="border-b border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground font-display">Book Your Visit</h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close booking dialog"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Gamified Progress */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {steps.map((s, i) => (
                    <div key={s.label} className="flex flex-col items-center gap-1">
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-300",
                          i < step
                            ? "border-secondary bg-secondary text-secondary-foreground"
                            : i === step
                              ? "border-secondary bg-secondary/10 text-secondary"
                              : "border-border bg-muted text-muted-foreground"
                        )}
                      >
                        {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                      </div>
                      <span className={cn("text-xs font-medium", i <= step ? "text-foreground" : "text-muted-foreground")}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary to-secondary/80"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Step {step + 1} of {steps.length}</span>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5 text-accent" />
                    <span className="font-semibold text-accent">{Math.round(progress)}% Complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">
                {/* Step 0: Service */}
                {step === 0 && (
                  <motion.div
                    key="service"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-3"
                  >
                    <p className="text-sm text-muted-foreground mb-4">Select the service you're interested in:</p>
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={cn(
                          "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                          selectedService === s.id
                            ? "border-secondary bg-secondary/5 shadow-sm"
                            : "border-border hover:border-secondary/30 hover:bg-muted/50"
                        )}
                      >
                        <div className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                          selectedService === s.id ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          <s.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground">{s.title}</div>
                          <div className="text-sm text-muted-foreground">{s.price}</div>
                        </div>
                        {selectedService === s.id && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <Check className="h-5 w-5 text-secondary" />
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Step 1: Date & Time */}
                {step === 1 && (
                  <motion.div
                    key="datetime"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-5"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Select a date:</p>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className={cn(
                            "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
                            selectedDate ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/30"
                          )}>
                            <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                            {selectedDate ? (
                              <span className="font-medium text-foreground">{format(selectedDate, "PPP")}</span>
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date() || date.getDay() === 0}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {selectedDate && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-sm font-medium text-foreground mb-2">Select a time:</p>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => setSelectedTime(t)}
                              className={cn(
                                "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",
                                selectedTime === t
                                  ? "border-secondary bg-secondary text-secondary-foreground"
                                  : "border-border text-foreground hover:border-secondary/30 hover:bg-muted/50"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Patient Info */}
                {step === 2 && (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-4"
                  >
                    <p className="text-sm text-muted-foreground mb-2">Tell us about yourself:</p>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Full Name *</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value.slice(0, 100))}
                        placeholder="John Doe"
                        className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Phone Number *</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9+\-() ]/g, "").slice(0, 20))}
                        placeholder="(123) 456-7890"
                        className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Email Address *</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                        type="email"
                        placeholder="john@example.com"
                        className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Notes (optional)</label>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value.slice(0, 500))}
                        rows={3}
                        placeholder="Any concerns or special requests..."
                        className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                        <Star className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Almost there!</h3>
                        <p className="text-sm text-muted-foreground">Review your appointment details</p>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Service</span>
                        <span className="text-sm font-medium text-foreground">{selectedServiceData?.title}</span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Date</span>
                        <span className="text-sm font-medium text-foreground">
                          {selectedDate ? format(selectedDate, "PPP") : ""}
                        </span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Time</span>
                        <span className="text-sm font-medium text-foreground">{selectedTime}</span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Patient</span>
                        <span className="text-sm font-medium text-foreground">{name}</span>
                      </div>
                      <div className="h-px bg-border" />
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contact</span>
                        <span className="text-sm font-medium text-foreground">{email}</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4 text-center">
                      <Trophy className="mx-auto mb-2 h-8 w-8 text-accent" />
                      <p className="text-sm font-medium text-foreground">You're booking in under 60 seconds! 🎉</p>
                      <p className="text-xs text-muted-foreground">A confirmation will be sent to your email</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-5 flex gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1 rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <button
                onClick={step === 3 ? handleSubmit : () => setStep(step + 1)}
                disabled={!canNext()}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all",
                  canNext()
                    ? "bg-secondary text-secondary-foreground hover:shadow-[var(--shadow-glow-teal)]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                {step === 3 ? (
                  <>
                    <Check className="h-4 w-4" />
                    Confirm Booking
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingFlow;
