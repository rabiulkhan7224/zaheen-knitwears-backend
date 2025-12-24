import { Router } from 'express';
import { AuthController } from './authController';
// import passport from '../config/passport';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authController.getMe);
router.post('/logout', authController.logout);
// Google OAuth
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get(
//   '/google/callback',
//   passport.authenticate('google', { session: false }),
//   authController.googleCallback
// );

const authRoutes = router;
export default authRoutes;