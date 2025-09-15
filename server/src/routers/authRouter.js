import express from 'express';
import { login, register } from '../controllers/authController.js';
import { upload } from '../config/cloudinary/index.js';

const router = express.Router();

router.post('/register',upload.single("imageFile"),register);
router.post('/login',login);
export default router;