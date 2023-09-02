import { Router } from 'express';
import petController from '../controllers/pet.controller';
import validate from '../middleware/validate';
import petValidator from '../validators/pet.validator';

const router = Router();

router.get('/mine', petController.mine);

router.post('/create', validate(petValidator.create), petController.create);

export default router;
