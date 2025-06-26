
import React from 'react';
import { Layout } from '@/components/Layout';

interface LeadsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const Leads: React.FC<LeadsProps> = ({ 
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
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <button 
            onClick={onOpenLeadModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Add Lead
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Leads management interface will be implemented here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Leads;
