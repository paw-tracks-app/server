import { Router } from 'express';
import authRouter from './auth.router';
import petRouter from './pet.router';
import { isAuthenticated } from '../middleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/pet', isAuthenticated, petRouter);

export default router;
