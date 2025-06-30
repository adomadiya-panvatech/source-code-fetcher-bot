
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ViewOpportunityModalProps {
  open: boolean;
  onClose: () => void;
  opportunity: any;
  onEdit: () => void;
}

export const ViewOpportunityModal: React.FC<ViewOpportunityModalProps> = ({ open, onClose, opportunity, onEdit }) => {
  if (!opportunity) return null;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospecting': return 'bg-gray-100 text-gray-800';
      case 'Discovery': return 'bg-blue-100 text-blue-800';
      case 'Qualification': return 'bg-yellow-100 text-yellow-800';
      case 'Proposal': return 'bg-orange-100 text-orange-800';
      case 'Negotiation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>View Opportunity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Opportunity:</strong> {opportunity.title || opportunity.name}</p>
            </div>
            <div>
              <p><strong>Company:</strong> {opportunity.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Value:</strong> <span className="font-semibold text-green-600">{opportunity.value}</span></p>
            </div>
            <div>
              <p><strong>Probability:</strong> {opportunity.probability || '0%'}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Stage:</strong> 
                <Badge className={`ml-2 ${getStageColor(opportunity.stage || 'Prospecting')}`}>
                  {opportunity.stage || 'Prospecting'}
                </Badge>
              </p>
            </div>
            <div>
              <p><strong>Status:</strong> 
                <Badge className={`ml-2 ${getStatusColor(opportunity.status || 'cold')}`}>
                  {opportunity.status || 'cold'}
                </Badge>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Close Date:</strong> {opportunity.closeDate || opportunity.expectedClose}</p>
            </div>
            <div>
              <p><strong>Owner:</strong> {opportunity.owner || opportunity.assignedTo}</p>
            </div>
          </div>
          {opportunity.description && (
            <div>
              <p><strong>Description:</strong></p>
              <p className="text-gray-600 mt-1">{opportunity.description}</p>
            </div>
          )}
        </div>
        <DialogFooter className="mt-6 flex justify-between">
          <Button onClick={onEdit} variant="outline">Edit</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
