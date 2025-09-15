import express from 'express';
import { getAlbumById, getAllAlbums } from '../controllers/albumController.js';

const router = express.Router();

router.get('/albums',getAllAlbums);
router.get('/albums/:albumId',getAlbumById);

export default router;