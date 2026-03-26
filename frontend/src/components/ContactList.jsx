import React from 'react';
import { FiEdit2, FiTrash2, FiMail, FiPhone } from 'react-icons/fi';

const ContactList = ({ contacts, onEdit, onDelete }) => {
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
          <li key={contact._id} className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
            <div className="flex items-center justify-between">
              
              <div className="min-w-0 flex-1">
                <p className="text-lg font-medium text-gray-900 truncate">{contact.name}</p>
                <div className="mt-1 flex flex-col sm:flex-row sm:space-x-4">
                  <div className="flex items-center text-sm text-gray-500 mb-1 sm:mb-0">
                    <FiMail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiPhone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-shrink-0 flex gap-2 ml-4">
                <button
                  onClick={() => onEdit(contact)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Edit"
                  title="Edit"
                >
                  <FiEdit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(contact._id, contact.name)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  aria-label="Delete"
                  title="Delete"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </div>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
