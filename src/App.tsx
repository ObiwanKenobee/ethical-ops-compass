
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import SupplyChain from "./pages/SupplyChain";
import RiskScanner from "./pages/RiskScanner";
import ActionTracker from "./pages/ActionTracker";
import CommsHub from "./pages/CommsHub";
import CaseStudies from "./pages/CaseStudies";
import SdgDashboard from "./pages/SdgDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/risk-scanner" element={<RiskScanner />} />
            <Route path="/action-tracker" element={<ActionTracker />} />
            <Route path="/comms-hub" element={<CommsHub />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/sdg-dashboard" element={<SdgDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
