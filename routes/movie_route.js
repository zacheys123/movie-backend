import express from 'express';
import {
	createMovie,
	getGame,
	addUser,
	addSuggested,
} from '../controllers/movie.js';
const router = express.Router();

router.route('/create/:id').put(createMovie);
router.route('/newuser/:id').put(addUser);
router.route('/newsuggested/:id').put(addSuggested);

router.route('/:id').get(getGame);

export default router;
