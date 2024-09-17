import express from 'express';
import {
  getCodes,
  getCodeById,
  createCode,
  updateCode,
  deleteCode
} from '../controllers/CodeController.js';

const router = express.Router();

router.get('/', getCodes);
router.get('/:id', getCodeById);
router.post('/', createCode);
router.put('/:id', updateCode);
router.delete('/:id', deleteCode);

export default router;
