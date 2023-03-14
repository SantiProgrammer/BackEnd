
import { Router } from 'express';
import { getHomeController } from '../controllers/homeController.js';

const router = new Router();

router.get('/', getHomeController);

export { router as defaultRouter };
