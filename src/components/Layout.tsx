
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

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Create a context or props to pass modal handlers down
  const childrenWithProps = React.cloneElement(children as React.ReactElement, {
    onOpenContactModal: () => setIsContactModalOpen(true),
    onOpenLeadModal: () => setIsLeadModalOpen(true),
    onOpenOpportunityModal: () => setIsOpportunityModalOpen(true),
    onOpenAccountModal: () => setIsAccountModalOpen(true),
    onOpenSMSModal: () => setIsSMSModalOpen(true),
    onOpenEmailModal: () => setIsEmailModalOpen(true),
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
        
        {/* ChatBot */}
        <ChatBot />
      </div>
    </ThemeProvider>
  );
};
