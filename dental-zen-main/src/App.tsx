import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ClinicPulse from "./pages/ClinicPulse";
import NotFound from "./pages/NotFound";
import SkeletonLoader from "./components/SkeletonLoader";

// Admin imports
import AdminLayout from "./components/admin/layout/AdminLayout";

// Lazy load admin pages for better performance
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Appointments = lazy(() => import("./pages/admin/Appointments"));
const Patients = lazy(() => import("./pages/admin/Patients"));
const Services = lazy(() => import("./pages/admin/Services"));
const Analytics = lazy(() => import("./pages/admin/Analytics"));
const Settings = lazy(() => import("./pages/admin/Settings"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/clinic-pulse" element={<ClinicPulse />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={
              <Suspense fallback={<SkeletonLoader />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="appointments" element={
              <Suspense fallback={<SkeletonLoader />}>
                <Appointments />
              </Suspense>
            } />
            <Route path="patients" element={
              <Suspense fallback={<SkeletonLoader />}>
                <Patients />
              </Suspense>
            } />
            <Route path="services" element={
              <Suspense fallback={<SkeletonLoader />}>
                <Services />
              </Suspense>
            } />
            <Route path="analytics" element={
              <Suspense fallback={<SkeletonLoader />}>
                <Analytics />
              </Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<SkeletonLoader />}>
                <Settings />
              </Suspense>
            } />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
