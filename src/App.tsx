
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
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
import { ContactModal } from '@/components/ContactModal';
import { LeadModal } from '@/components/LeadModal';
import { OpportunityModal } from '@/components/OpportunityModal';
import { AccountModal } from '@/components/AccountModal';
import { SMSModal } from '@/components/SMSModal';
import { EmailModal } from '@/components/EmailModal';

const queryClient = new QueryClient();

const App = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const modalHandlers = {
    onOpenContactModal: () => setIsContactModalOpen(true),
    onOpenLeadModal: () => setIsLeadModalOpen(true),
    onOpenOpportunityModal: () => setIsOpportunityModalOpen(true),
    onOpenAccountModal: () => setIsAccountModalOpen(true),
    onOpenSMSModal: () => setIsSMSModalOpen(true),
    onOpenEmailModal: () => setIsEmailModalOpen(true),
  };

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
          
          {/* Global Modals */}
          <ContactModal 
            isOpen={isContactModalOpen} 
            onClose={() => setIsContactModalOpen(false)} 
          />
          <LeadModal 
            isOpen={isLeadModalOpen} 
            onClose={() => setIsLeadModalOpen(false)} 
          />
          <OpportunityModal 
            isOpen={isOpportunityModalOpen} 
            onClose={() => setIsOpportunityModalOpen(false)} 
          />
          <AccountModal 
            isOpen={isAccountModalOpen} 
            onClose={() => setIsAccountModalOpen(false)} 
          />
          <SMSModal 
            isOpen={isSMSModalOpen} 
            onClose={() => setIsSMSModalOpen(false)} 
          />
          <EmailModal 
            isOpen={isEmailModalOpen} 
            onClose={() => setIsEmailModalOpen(false)} 
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
