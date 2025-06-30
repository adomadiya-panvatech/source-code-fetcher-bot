
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ViewAccountModalProps {
  open: boolean;
  onClose: () => void;
  account: any;
  onEdit: () => void;
}

export const ViewAccountModal: React.FC<ViewAccountModalProps> = ({ open, onClose, account, onEdit }) => {
  if (!account) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'customer': return 'bg-green-100 text-green-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      case 'partner': return 'bg-purple-100 text-purple-800';
      case 'competitor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>View Account</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Account Name:</strong> {account.name}</p>
            </div>
            <div>
              <p><strong>Type:</strong> 
                <Badge className={`ml-2 ${getTypeColor(account.type || 'prospect')}`}>
                  {account.type || 'prospect'}
                </Badge>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Industry:</strong> {account.industry}</p>
            </div>
            <div>
              <p><strong>Website:</strong> 
                {account.website && (
                  <a href={account.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                    {account.website}
                  </a>
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Phone:</strong> {account.phone}</p>
            </div>
            <div>
              <p><strong>Email:</strong> 
                {account.email && (
                  <a href={`mailto:${account.email}`} className="text-blue-600 hover:underline ml-1">
                    {account.email}
                  </a>
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Employees:</strong> {account.employees}</p>
            </div>
            <div>
              <p><strong>Revenue:</strong> <span className="font-semibold text-green-600">{account.revenue}</span></p>
            </div>
          </div>
          {account.address && (
            <div>
              <p><strong>Address:</strong> {account.address}</p>
            </div>
          )}
          {account.description && (
            <div>
              <p><strong>Description:</strong></p>
              <p className="text-gray-600 mt-1">{account.description}</p>
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
