
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ViewLeadModalProps {
  open: boolean;
  onClose: () => void;
  lead: any;
  onEdit: () => void;
}

export const ViewLeadModal: React.FC<ViewLeadModalProps> = ({ open, onClose, lead, onEdit }) => {
  if (!lead) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'cold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Website Form': return 'bg-blue-100 text-blue-800';
      case 'LinkedIn': return 'bg-purple-100 text-purple-800';
      case 'Referral': return 'bg-green-100 text-green-800';
      case 'Trade Show': return 'bg-yellow-100 text-yellow-800';
      case 'Cold Call': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>View Lead</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Name:</strong> {lead.name}</p>
            </div>
            <div>
              <p><strong>Company:</strong> {lead.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Job Title:</strong> {lead.jobTitle || lead.position}</p>
            </div>
            <div>
              <p><strong>Email:</strong> {lead.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Phone:</strong> {lead.phone}</p>
            </div>
            <div>
              <p><strong>Score:</strong> <span className="font-semibold">{lead.score || 0}</span></p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Status:</strong> 
                <Badge className={`ml-2 ${getStatusColor(lead.status || 'cold')}`}>
                  {lead.status || 'cold'}
                </Badge>
              </p>
            </div>
            <div>
              <p><strong>Source:</strong> 
                <Badge className={`ml-2 ${getSourceColor(lead.source || 'Other')}`}>
                  {lead.source || 'Other'}
                </Badge>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Assigned To:</strong> {lead.assignedTo || lead.owner}</p>
            </div>
            <div>
              <p><strong>Last Activity:</strong> {lead.lastActivity || lead.updatedAt}</p>
            </div>
          </div>
          {lead.notes && (
            <div>
              <p><strong>Notes:</strong></p>
              <p className="text-gray-600 mt-1">{lead.notes}</p>
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
