import { Router } from 'express';
import { AuthController } from './authController';
import { protect } from '../../middleware/authMiddleware';

const router = Router();

const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me',protect, authController.getMe);
router.post('/logout', authController.logout);

router.post('/google-token', authController.googleTokenLogin);

const authRoutes = router;
export default authRoutes;