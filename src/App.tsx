
import { useState } from "react";
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

import { ContactModal } from '@/components/ContactModal';
import { ContactEditModal } from '@/components/ContactEditModal';
import { LeadModal } from '@/components/LeadModal';
import { LeadEditModal } from '@/components/LeadEditModal';
import { OpportunityModal } from '@/components/OpportunityModal';
import { OpportunityEditModal } from '@/components/OpportunityEditModal';
import { AccountModal } from '@/components/AccountModal';
import { AccountEditModal } from '@/components/AccountEditModal';
import { SMSModal } from '@/components/SMSModal';
import { EmailModal } from '@/components/EmailModal';
import { ViewContactModal } from '@/components/modals/ViewContactModal';
import { ViewLeadModal } from '@/components/modals/ViewLeadModal';
import { ViewOpportunityModal } from '@/components/modals/ViewOpportunityModal';
import { ViewAccountModal } from '@/components/modals/ViewAccountModal';
import { ViewCommunicationModal } from '@/components/modals/ViewCommunicationModal';

const queryClient = new QueryClient();

const App = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [viewContact, setViewContact] = useState(null);

  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [isViewLeadModalOpen, setIsViewLeadModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [viewLead, setViewLead] = useState(null);

  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isEditOpportunityModalOpen, setIsEditOpportunityModalOpen] = useState(false);
  const [isViewOpportunityModalOpen, setIsViewOpportunityModalOpen] = useState(false);
  const [editOpportunity, setEditOpportunity] = useState(null);
  const [viewOpportunity, setViewOpportunity] = useState(null);

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isViewAccountModalOpen, setIsViewAccountModalOpen] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [viewAccount, setViewAccount] = useState(null);

  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [viewCommunication, setViewCommunication] = useState(false);
  const [isViewCommunicationModalOpen, setIsViewCommunicationModalOpen] = useState(false);

  const modalHandlers = {
    onOpenContactModal: () => setIsContactModalOpen(true),
    onOpenEditContactModal: (contact) => {
      setEditContact(contact);
      setIsEditContactModalOpen(true);
    },
    onOpenViewContactModal: (contact) => {
      setViewContact(contact);
      setIsViewContactModalOpen(true);
    },
    onOpenLeadModal: () => setIsLeadModalOpen(true),
    onOpenEditLeadModal: (lead) => {
      setEditLead(lead);
      setIsEditLeadModalOpen(true);
    },
    onOpenViewLeadModal: (lead) => {
      setViewLead(lead);
      setIsViewLeadModalOpen(true);
    },
    onOpenOpportunityModal: () => setIsOpportunityModalOpen(true),
    onOpenEditOpportunityModal: (opportunity) => {
      setEditOpportunity(opportunity);
      setIsEditOpportunityModalOpen(true);
    },
    onOpenViewOpportunityModal: (opportunity) => {
      setViewOpportunity(opportunity);
      setIsViewOpportunityModalOpen(true);
    },
    onOpenAccountModal: () => setIsAccountModalOpen(true),
    onOpenEditAccountModal: (account) => {
      setEditAccount(account);
      setIsEditAccountModalOpen(true);
    },
    onOpenViewAccountModal: (account) => {
      setViewAccount(account);
      setIsViewAccountModalOpen(true);
    },
    onOpenSMSModal: () => setIsSMSModalOpen(true),
    onOpenEmailModal: () => setIsEmailModalOpen(true),
    onOpenViewCommunicationModal: (communication) => {
      setViewCommunication(communication);
      setIsViewCommunicationModalOpen(true);
    },
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
          <ContactEditModal
            isOpen={isEditContactModalOpen}
            onClose={() => {
              setIsEditContactModalOpen(false);
              setEditContact(null);
            }}
            contact={editContact}
          />
          <ViewContactModal
            open={isViewContactModalOpen}
            onClose={() => {
              setIsViewContactModalOpen(false);
              setViewContact(null);
            }}
            contact={viewContact}
            onEdit={() => {
              setIsViewContactModalOpen(false);
              setEditContact(viewContact);
              setIsEditContactModalOpen(true);
              setViewContact(null);
            }}
          />
          <LeadModal
            isOpen={isLeadModalOpen}
            onClose={() => setIsLeadModalOpen(false)}
          />
          <LeadEditModal
            isOpen={isEditLeadModalOpen}
            onClose={() => {
              setIsEditLeadModalOpen(false);
              setEditLead(null);
            }}
            lead={editLead}
          />
          <ViewLeadModal
            open={isViewLeadModalOpen}
            onClose={() => {
              setIsViewLeadModalOpen(false);
              setViewLead(null);
            }}
            lead={viewLead}
            onEdit={() => {
              setIsViewLeadModalOpen(false);
              setEditLead(viewLead);
              setIsEditLeadModalOpen(true);
              setViewLead(null);
            }}
          />
          <OpportunityModal
            isOpen={isOpportunityModalOpen}
            onClose={() => setIsOpportunityModalOpen(false)}
          />
          <OpportunityEditModal
            isOpen={isEditOpportunityModalOpen}
            onClose={() => {
              setIsEditOpportunityModalOpen(false);
              setEditOpportunity(null);
            }}
            opportunity={editOpportunity}
          />
          <ViewOpportunityModal
            open={isViewOpportunityModalOpen}
            onClose={() => {
              setIsViewOpportunityModalOpen(false);
              setViewOpportunity(null);
            }}
            opportunity={viewOpportunity}
            onEdit={() => {
              setIsViewOpportunityModalOpen(false);
              setEditOpportunity(viewOpportunity);
              setIsEditOpportunityModalOpen(true);
              setViewOpportunity(null);
            }}
          />
          <AccountModal
            isOpen={isAccountModalOpen}
            onClose={() => setIsAccountModalOpen(false)}
          />
          <AccountEditModal
            isOpen={isEditAccountModalOpen}
            onClose={() => {
              setIsEditAccountModalOpen(false);
              setEditAccount(null);
            }}
            account={editAccount}
          />
          <ViewAccountModal
            open={isViewAccountModalOpen}
            onClose={() => {
              setIsViewAccountModalOpen(false);
              setViewAccount(null);
            }}
            account={viewAccount}
            onEdit={() => {
              setIsViewAccountModalOpen(false);
              setEditAccount(viewAccount);
              setIsEditAccountModalOpen(true);
              setViewAccount(null);
            }}
          />
          <SMSModal
            isOpen={isSMSModalOpen}
            onClose={() => setIsSMSModalOpen(false)}
          />
          <EmailModal
            isOpen={isEmailModalOpen}
            onClose={() => setIsEmailModalOpen(false)}
          />

          <ViewCommunicationModal
            open={isViewCommunicationModalOpen}
            onClose={() => {
              setIsViewCommunicationModalOpen(false);
              setViewCommunication(null);
            }}
            communication={viewCommunication}
            onEdit={() => {
              setIsViewCommunicationModalOpen(false);
              // Handle edit functionality here if needed
            }}
          />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
