
import React from 'react';
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

interface GlobalModalsProps {
  modalStates: any;
}

export const GlobalModals: React.FC<GlobalModalsProps> = ({ modalStates }) => {
  const {
    // Contact modals
    isContactModalOpen,
    setIsContactModalOpen,
    isEditContactModalOpen,
    setIsEditContactModalOpen,
    isViewContactModalOpen,
    setIsViewContactModalOpen,
    editContact,
    setEditContact,
    viewContact,
    setViewContact,
    
    // Lead modals
    isLeadModalOpen,
    setIsLeadModalOpen,
    isEditLeadModalOpen,
    setIsEditLeadModalOpen,
    isViewLeadModalOpen,
    setIsViewLeadModalOpen,
    editLead,
    setEditLead,
    viewLead,
    setViewLead,
    
    // Opportunity modals
    isOpportunityModalOpen,
    setIsOpportunityModalOpen,
    isEditOpportunityModalOpen,
    setIsEditOpportunityModalOpen,
    isViewOpportunityModalOpen,
    setIsViewOpportunityModalOpen,
    editOpportunity,
    setEditOpportunity,
    viewOpportunity,
    setViewOpportunity,
    
    // Account modals
    isAccountModalOpen,
    setIsAccountModalOpen,
    isEditAccountModalOpen,
    setIsEditAccountModalOpen,
    isViewAccountModalOpen,
    setIsViewAccountModalOpen,
    editAccount,
    setEditAccount,
    viewAccount,
    setViewAccount,
    
    // Communication modals
    isSMSModalOpen,
    setIsSMSModalOpen,
    isEmailModalOpen,
    setIsEmailModalOpen,
    viewCommunication,
    setViewCommunication,
    isViewCommunicationModalOpen,
    setIsViewCommunicationModalOpen,
  } = modalStates;

  return (
    <>
      {/* Contact Modals */}
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

      {/* Lead Modals */}
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

      {/* Opportunity Modals */}
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

      {/* Account Modals */}
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

      {/* Communication Modals */}
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
    </>
  );
};
