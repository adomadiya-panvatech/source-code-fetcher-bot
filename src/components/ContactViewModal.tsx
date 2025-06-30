import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ContactViewModalProps {
  open: boolean;
  onClose: () => void;
  contact: any;
  onEdit: () => void;
}

export const ContactViewModal: React.FC<ContactViewModalProps> = ({ open, onClose, contact, onEdit }) => {
  if (!contact) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Contact</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Company:</strong> {contact.company}</p>
          <p><strong>Position:</strong> {contact.position}</p>
          <p><strong>Status:</strong> {contact.status}</p>
          <p><strong>Source:</strong> {contact.source}</p>
          <p><strong>Tags:</strong> {(Array.isArray(contact.tags) ? contact.tags : JSON.parse(contact.tags || '[]')).join(', ')}</p>
        </div>
        <DialogFooter className="mt-4 flex justify-between">
          <Button onClick={onEdit} variant="outline">Edit</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
