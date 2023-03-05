
import { Router } from 'express';
import {
    getProductAddController, getProductsListController, getProductController, postProductController
} from '../controllers/productController.js';

const router = new Router()

router.get('/stock', getProductController)
router.get('/list', getProductsListController)
router.get('/add', getProductAddController)
router.post('/add', postProductController)

export { router as productRouter };
