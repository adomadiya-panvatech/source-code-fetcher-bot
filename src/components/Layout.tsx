
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { ContactModal } from '@/components/ContactModal';
import { LeadModal } from '@/components/LeadModal';
import { OpportunityModal } from '@/components/OpportunityModal';
import { AccountModal } from '@/components/AccountModal';
import { SMSModal } from '@/components/SMSModal';
import { EmailModal } from '@/components/EmailModal';
import { ChatBot } from '@/components/ChatBot';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ContactEditModal } from "@/components/ContactEditModal";
import { LeadEditModal } from "@/components/LeadEditModal";
import { OpportunityEditModal } from "@/components/OpportunityEditModal";
import { AccountEditModal } from "@/components/AccountEditModal";
import { ViewContactModal } from "@/components/modals/ViewContactModal";
import { ViewLeadModal } from "@/components/modals/ViewLeadModal";
import { ViewOpportunityModal } from "@/components/modals/ViewOpportunityModal";
import { ViewAccountModal } from "@/components/modals/ViewAccountModal";
import { ViewCommunicationModal } from "@/components/modals/ViewCommunicationModal";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
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
  
  // Communication modal state
  const [isViewCommunicationModalOpen, setIsViewCommunicationModalOpen] = useState(false);
  const [viewCommunication, setViewCommunication] = useState(null);

  // Create a context or props to pass modal handlers down
  const childrenWithProps = React.cloneElement(children as React.ReactElement, {
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
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
        <div className="flex w-full">
          <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
          
          <main className="flex-1 min-h-screen">
            <TopBar />
            {childrenWithProps}
          </main>
        </div>
        
        {/* Modals */}
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
        
        {/* Communication View Modal */}
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
        
        {/* ChatBot */}
        <ChatBot />
      </div>
    </ThemeProvider>
  );
};
