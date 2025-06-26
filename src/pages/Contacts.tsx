
import React from 'react';
import { Layout } from '@/components/Layout';

interface ContactsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const Contacts: React.FC<ContactsProps> = ({ 
  onOpenContactModal, 
  onOpenLeadModal,
  onOpenOpportunityModal,
  onOpenAccountModal,
  onOpenSMSModal,
  onOpenEmailModal
}) => {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <button 
            onClick={onOpenContactModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Contact
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Contacts management interface will be implemented here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
