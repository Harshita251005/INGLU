import express from 'express';
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite
} from '../controllers/contactController.js';

const router = express.Router();

router.route('/')
  .get(getContacts)
  .post(createContact);

router.route('/:id')
  .put(updateContact)
  .delete(deleteContact);

router.route('/:id/favorite')
  .patch(toggleFavorite);

export default router;
