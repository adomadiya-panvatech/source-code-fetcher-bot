
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Opportunities from "./pages/Opportunities";
import Accounts from "./pages/Accounts";
import Contacts from "./pages/Contacts";
import Leads from "./pages/Leads";
import Communications from "./pages/Communications";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CRM from "./pages/CRM";

import { useModalManager } from '@/hooks/useModalManager';
import { GlobalModals } from '@/components/GlobalModals';

const queryClient = new QueryClient();

const App = () => {
  const { modalHandlers, modalStates } = useModalManager();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Index {...modalHandlers} />} />
            <Route path="/crm" element={<CRM {...modalHandlers} />} />
            <Route path="/opportunities" element={<Opportunities {...modalHandlers} />} />
            <Route path="/accounts" element={<Accounts {...modalHandlers} />} />
            <Route path="/contacts" element={<Contacts {...modalHandlers} />} />
            <Route path="/leads" element={<Leads {...modalHandlers} />} />
            <Route path="/communications" element={<Communications {...modalHandlers} />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <GlobalModals modalStates={modalStates} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
