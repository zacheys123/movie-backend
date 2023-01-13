import express from 'express';
import { createMovie, getGame } from '../controllers/movie.js';
const router = express.Router();

router.route('/create/:id').put(createMovie);

router.route('/:id').get(getGame);

export default router;
