import express from 'express';
import {
	getUsers,
	getUser,
	update_user,
	update_pass,
	update_plan,
	delete_user,
} from '../controllers/user.js';
const router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getUser);
router.route('/update/:id').put(update_user);
router.route('/update_auth/:id').put(update_pass);
router.route('/package/:id').put(update_plan);
router.route('/deleteuser').post(delete_user);

export default router;
