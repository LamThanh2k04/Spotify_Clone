import express from 'express';
import { verifyToken  } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/adminMiddleware.js';
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from '../controllers/adminController.js';
import { upload } from '../config/cloudinary/index.js';

const router = express.Router();

// router.use(verifyToken ,isAdmin);

router.get('/check',verifyToken,isAdmin,checkAdmin);
router.post('/songs',upload.fields([
    { name: 'imageFile', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 }
]),verifyToken,isAdmin,createSong);
router.delete('/songs/:id',verifyToken,isAdmin,deleteSong);
router.post('/albums',upload.single("imageFile"),verifyToken,isAdmin,createAlbum);
router.delete('/albums/:id',verifyToken,isAdmin,deleteAlbum);

export default router;