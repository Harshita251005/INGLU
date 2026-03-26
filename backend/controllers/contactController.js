import Contact from '../models/Contact.js';

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
export const getContacts = async (req, res) => {
  try {
    const { search } = req.query;
    
    // Build search query if provided string
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not fetch contacts', error: error.message });
  }
};

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide both name and email' });
    }

    // Check if contact with same email exists
    const existingContact = await Contact.findOne({ email });
    if (existingContact) {
      return res.status(400).json({ message: 'Contact with this email already exists' });
    }

    const contact = await Contact.create({
      name,
      email,
      phone
    });

    res.status(201).json(contact);
  } catch (error) {
    if (error.name === 'ValidationError') {
       return res.status(400).json({ message: 'Validation Error', error: error.message });
    }
    res.status(500).json({ message: 'Server Error: Could not create contact', error: error.message });
  }
};

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    let contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    res.status(200).json(contact);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(500).json({ message: 'Server Error: Could not update contact', error: error.message });
  }
};

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Public
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    await Contact.deleteOne({ _id: id });

    res.status(200).json({ message: 'Contact removed', id });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(500).json({ message: 'Server Error: Could not delete contact', error: error.message });
  }
};
