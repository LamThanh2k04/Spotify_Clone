import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { addFavoriteSong, removeFavoriteSong } from '../controllers/favoriteSong.js';

const router = express.Router();

router.post('/favorite-songs/:songId',verifyToken,addFavoriteSong);
router.delete('/favorite-songs/:songId',verifyToken,removeFavoriteSong);


export default router;  