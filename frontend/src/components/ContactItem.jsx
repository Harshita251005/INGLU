import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiMail, FiPhone, FiStar } from 'react-icons/fi';

const ContactItem = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  const [showFullNotes, setShowFullNotes] = useState(false);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Work': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Family': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-green-100 text-green-800 border-green-200'; // Personal
    }
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(contact.updatedAt || contact.createdAt || Date.now()));

  const toggleNotes = () => setShowFullNotes(!showFullNotes);

  return (
    <li className="p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <div className="flex items-start justify-between">
        
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <button 
              onClick={() => onToggleFavorite(contact._id, contact.isFavorite)}
              className="text-gray-400 hover:text-yellow-500 focus:outline-none transition-colors"
              title={contact.isFavorite ? "Unfavorite" : "Favorite"}
            >
              <FiStar className={`h-5 w-5 ${contact.isFavorite ? 'fill-yellow-400 text-yellow-500' : ''}`} />
            </button>
            <p className="text-lg font-medium text-gray-900 truncate">{contact.name}</p>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryColor(contact.category)}`}>
              {contact.category || 'Personal'}
            </span>
          </div>

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
          
          <div className="mt-2 text-xs text-gray-400">
            Last Updated: {formattedDate}
          </div>

          {contact.notes && (
            <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-100">
              <p className="whitespace-pre-wrap">
                {showFullNotes || contact.notes.length <= 100 
                  ? contact.notes 
                  : `${contact.notes.substring(0, 100)}...`}
              </p>
              {contact.notes.length > 100 && (
                <button 
                  onClick={toggleNotes}
                  className="mt-1 text-blue-600 hover:text-blue-800 font-medium text-xs focus:outline-none"
                >
                  {showFullNotes ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex gap-2 ml-4">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-[-4px]"
            aria-label="Edit"
            title="Edit"
          >
            <FiEdit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(contact._id, contact.name)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 mt-[-4px]"
            aria-label="Delete"
            title="Delete"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
        
      </div>
    </li>
  );
};

export default ContactItem;
