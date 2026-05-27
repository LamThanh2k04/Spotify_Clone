import express from 'express';
import { verifyToken  } from '../middleware/authMiddleware.js';
import { getUser } from '../controllers/userController.js';


const router = express.Router();
console.log(verifyToken )
router.get('/test-debug', (req, res) => {
  console.log("🔥 test-debug được gọi nè");
    res.send("Router hoạt động nhen!");
  });
router.get('/test-user',verifyToken ,getUser);

export default router;