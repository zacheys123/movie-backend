import express from 'express';
import { createMusic, getMusic } from '../controllers/music.js';
const router = express.Router();

router.route('/create/:id').put(createMusic);

router.route('/getmusic/:id').get(getMusic);

export default router;
