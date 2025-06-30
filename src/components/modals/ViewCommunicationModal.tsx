
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MessageSquare } from 'lucide-react';

interface ViewCommunicationModalProps {
  open: boolean;
  onClose: () => void;
  communication: any;
  onEdit: () => void;
}

export const ViewCommunicationModal: React.FC<ViewCommunicationModalProps> = ({ 
  open, 
  onClose, 
  communication, 
  onEdit 
}) => {
  if (!communication) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'sms': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'phone': return 'bg-green-100 text-green-800';
      case 'sms': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-blue-100 text-blue-800';
      case 'opened': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'missed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDirectionColor = (direction: string) => {
    return direction === 'inbound' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            View Communication
            <Badge className={`${getTypeColor(communication.type)}`}>
              {getTypeIcon(communication.type)}
              <span className="ml-1 capitalize">{communication.type}</span>
            </Badge>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Subject:</strong> {communication.subject}</p>
            </div>
            <div>
              <p><strong>Date:</strong> {communication.date}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Contact:</strong> {communication.contact}</p>
            </div>
            <div>
              <p><strong>Company:</strong> {communication.company}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Direction:</strong> 
                <Badge className={`ml-2 ${getDirectionColor(communication.direction)}`}>
                  {communication.direction}
                </Badge>
              </p>
            </div>
            <div>
              <p><strong>Status:</strong> 
                <Badge className={`ml-2 ${getStatusColor(communication.status)}`}>
                  {communication.status}
                </Badge>
              </p>
            </div>
          </div>
          <div>
            <p><strong>Assigned To:</strong> {communication.assignedTo}</p>
          </div>
          {communication.content && (
            <div>
              <p><strong>Content:</strong></p>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{communication.content}</p>
              </div>
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
