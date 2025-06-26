
import React from 'react';
import { CRMLayout } from '@/components/CRMLayout';
import { CRMDashboard } from '@/components/CRMDashboard';

interface CRMProps {
  onOpenContactModal?: () => void;
  onOpenLeadModal?: () => void;
}

const CRM: React.FC<CRMProps> = ({ onOpenContactModal, onOpenLeadModal }) => {
  return (
    <CRMLayout onOpenContactModal={onOpenContactModal} onOpenLeadModal={onOpenLeadModal}>
      <CRMDashboard />
    </CRMLayout>
  );
};

export default CRM;
