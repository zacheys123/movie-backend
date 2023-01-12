import express from 'express';
import { getUsers, getUser } from '../controllers/user.js';
const router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getUser);

export default router;
