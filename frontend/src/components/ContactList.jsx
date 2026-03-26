import React from 'react';
import ContactItem from './ContactItem';

const ContactList = ({ contacts, onEdit, onDelete, onToggleFavorite }) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500">No contacts found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {contacts.map((contact) => (
          <ContactItem 
            key={contact._id} 
            contact={contact} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            onToggleFavorite={onToggleFavorite} 
          />
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
