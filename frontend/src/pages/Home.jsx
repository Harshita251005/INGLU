import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import { toast } from 'react-hot-toast';
import { FiSearch } from 'react-icons/fi';

const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = useCallback(async (searchQuery = '', catQuery = '') => {
    setLoading(true);
    try {
      const { data } = await api.get('/contacts', {
        params: { search: searchQuery, category: catQuery || undefined }
      });
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch contacts. Is the backend running?');
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Debounce search
    const delayDebounceFn = setTimeout(() => {
      fetchContacts(search, category);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, fetchContacts]);

  const handleSaveContact = async (contactData, id = null) => {
    try {
      if (id) {
        // Update
        const { data } = await api.put(`/contacts/${id}`, contactData);
        setContacts(contacts.map(c => c._id === id ? data : c));
        toast.success('Contact updated successfully');
        setEditingContact(null);
      } else {
        // Create
        const { data } = await api.post('/contacts', contactData);
        setContacts([data, ...contacts]);
        toast.success('Contact added successfully');
      }
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Failed to save contact';
      toast.error(message);
    }
  };

  const handleDeleteContact = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await api.delete(`/contacts/${id}`);
        setContacts(contacts.filter(c => c._id !== id));
        toast.success('Contact deleted');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete contact');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleToggleFavorite = async (id, currentStatus) => {
    // Optimistic update
    setContacts(contacts.map(c => 
      c._id === id ? { ...c, isFavorite: !currentStatus } : c
    ));

    try {
      await api.patch(`/contacts/${id}/favorite`);
      // Since backend controls sorting, we probably want to re-fetch if we care about immediate reordering.
      // For this implementation, the backend does reorder, but we can do a quick re-fetch to keep it synced.
      fetchContacts(search, category);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update favorite status');
      // Revert optimistic update
      setContacts(contacts.map(c => 
        c._id === id ? { ...c, isFavorite: currentStatus } : c
      ));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-1">
        <ContactForm 
          onSave={handleSaveContact} 
          onCancel={handleCancelEdit}
          editContact={editingContact} 
        />
      </div>

      <div className="md:col-span-3">
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Search contacts by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white"
            >
              <option value="">All Categories</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Family">Family</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading && contacts.length === 0 ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-500">Loading contacts...</p>
          </div>
        ) : (
          <ContactList 
            contacts={contacts} 
            onEdit={setEditingContact} 
            onDelete={handleDeleteContact} 
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
