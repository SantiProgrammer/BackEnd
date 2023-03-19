import { Router } from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { checkAuthentication } from '../middleware/passportAuth.js';

const router = new Router();

router.get('/profile', checkAuthentication, getUserProfile);

export { router as userRouter };

