import { Router } from 'express';
import { AuthController } from '../controllers';
import validate from '../middleware/validate';
import authValidator from '../validators/auth.validator';

const router = Router();

router.post('/login', validate(authValidator.login), AuthController.login);
router.post('/register', validate(authValidator.register), AuthController.register);

export default router;
