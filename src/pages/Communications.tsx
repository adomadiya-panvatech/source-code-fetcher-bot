
import React from 'react';
import { Layout } from '@/components/Layout';

interface CommunicationsProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
  onOpenOpportunityModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenSMSModal?: () => void;
  onOpenEmailModal?: () => void;
}

const Communications: React.FC<CommunicationsProps> = ({ 
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
          <h1 className="text-2xl font-bold text-gray-900">Communications</h1>
          <div className="flex space-x-2">
            <button 
              onClick={onOpenSMSModal}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Send SMS
            </button>
            <button 
              onClick={onOpenEmailModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Send Email
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Communications management interface will be implemented here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Communications;
