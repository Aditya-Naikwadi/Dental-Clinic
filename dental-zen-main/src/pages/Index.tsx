import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceMatrix from "@/components/ServiceMatrix";
import ReviewCarousel from "@/components/ReviewCarousel";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import BookingFAB from "@/components/BookingFAB";
import BookingFlow from "@/components/BookingFlow";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar onBook={() => setBookingOpen(true)} />
      <main>
        <Hero onBook={() => setBookingOpen(true)} />
        <ServiceMatrix />
        <ReviewCarousel />
      </main>
      <Footer />
      <ChatBot />
      <BookingFAB onBook={() => setBookingOpen(true)} />
      <BookingFlow open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default Index;
