
import { useState } from 'react';

export const useModalManager = () => {
  // Contact modal states
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isViewContactModalOpen, setIsViewContactModalOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [viewContact, setViewContact] = useState(null);

  // Lead modal states
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] = useState(false);
  const [isViewLeadModalOpen, setIsViewLeadModalOpen] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [viewLead, setViewLead] = useState(null);

  // Opportunity modal states
  const [isOpportunityModalOpen, setIsOpportunityModalOpen] = useState(false);
  const [isEditOpportunityModalOpen, setIsEditOpportunityModalOpen] = useState(false);
  const [isViewOpportunityModalOpen, setIsViewOpportunityModalOpen] = useState(false);
  const [editOpportunity, setEditOpportunity] = useState(null);
  const [viewOpportunity, setViewOpportunity] = useState(null);

  // Account modal states
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [isViewAccountModalOpen, setIsViewAccountModalOpen] = useState(false);
  const [editAccount, setEditAccount] = useState(null);
  const [viewAccount, setViewAccount] = useState(null);

  // Communication modal states
  const [isSMSModalOpen, setIsSMSModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [viewCommunication, setViewCommunication] = useState(false);
  const [isViewCommunicationModalOpen, setIsViewCommunicationModalOpen] = useState(false);

  const modalHandlers = {
    onOpenContactModal: () => setIsContactModalOpen(true),
    onOpenEditContactModal: (contact: any) => {
      setEditContact(contact);
      setIsEditContactModalOpen(true);
    },
    onOpenViewContactModal: (contact: any) => {
      setViewContact(contact);
      setIsViewContactModalOpen(true);
    },
    onOpenLeadModal: () => setIsLeadModalOpen(true),
    onOpenEditLeadModal: (lead: any) => {
      setEditLead(lead);
      setIsEditLeadModalOpen(true);
    },
    onOpenViewLeadModal: (lead: any) => {
      setViewLead(lead);
      setIsViewLeadModalOpen(true);
    },
    onOpenOpportunityModal: () => setIsOpportunityModalOpen(true),
    onOpenEditOpportunityModal: (opportunity: any) => {
      setEditOpportunity(opportunity);
      setIsEditOpportunityModalOpen(true);
    },
    onOpenViewOpportunityModal: (opportunity: any) => {
      setViewOpportunity(opportunity);
      setIsViewOpportunityModalOpen(true);
    },
    onOpenAccountModal: () => setIsAccountModalOpen(true),
    onOpenEditAccountModal: (account: any) => {
      setEditAccount(account);
      setIsEditAccountModalOpen(true);
    },
    onOpenViewAccountModal: (account: any) => {
      setViewAccount(account);
      setIsViewAccountModalOpen(true);
    },
    onOpenSMSModal: () => setIsSMSModalOpen(true),
    onOpenEmailModal: () => setIsEmailModalOpen(true),
    onOpenViewCommunicationModal: (communication: any) => {
      setViewCommunication(communication);
      setIsViewCommunicationModalOpen(true);
    },
  };

  const modalStates = {
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
  };

  return {
    modalHandlers,
    modalStates,
  };
};
