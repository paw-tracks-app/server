import { Router } from 'express';
import { AuthController } from '../controllers';
import validate from '../middleware/validate';
import authValidator from '../validators/auth.validator';
import { isAuthenticated } from '../middleware';

const router = Router();

router.get('/current', isAuthenticated, AuthController.currentUser);
router.post('/login', validate(authValidator.login), AuthController.login);
router.post(
  '/register',
  validate(authValidator.register),
  AuthController.register,
);

export default router;
