import express from 'express';
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs, searchSongs } from '../controllers/songController.js';
import { verifyToken  } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();
console.log()

router.get('/songs',verifyToken,isAdmin,getAllSongs);
router.get('/songs/search',searchSongs);
router.get('/songs/featured',getFeaturedSongs);
router.get('/songs/made-for-you',getMadeForYouSongs);
router.get('/songs/trending',getTrendingSongs);

export default router;
