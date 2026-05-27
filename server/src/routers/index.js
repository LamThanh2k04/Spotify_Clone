import express from 'express';
const router = express.Router();

import userRouter from './userRouter.js';
import authRouter from './authRouter.js';
import adminRouter from './adminRouter.js';
import albumRouter from './albumRouter.js';
import songRouter from './songRouter.js';
import statRouter from './statRouter.js';
import favoriteSongRouter from './favoriteSongs.js';
router.use('/api',authRouter);
router.use('/api/admin',adminRouter);
router.use('/api',userRouter);
router.use('/api',albumRouter);
router.use('/api',songRouter);
router.use('/api',statRouter);
router.use('/api',favoriteSongRouter);
router.get('/',(req,res)=>[
    res.send('Day laf trnag home')
])
export default router;