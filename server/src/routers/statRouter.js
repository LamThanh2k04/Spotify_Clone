import { verifyToken  } from "../middleware/authMiddleware.js";
import express from 'express';
import { isAdmin } from "../middleware/adminMiddleware.js";
import { getAllStats } from "../controllers/statController.js";

const router = express.Router();

router.get('/stats',verifyToken,isAdmin,getAllStats);
export default router;