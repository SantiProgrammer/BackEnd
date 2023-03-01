
import { Router } from 'express';
import {
    getProductsListController,
    getProductAddController,
    postProductAddController,
    getStockController
} from '../controllers/productController.js';

const router = new Router()

router.get('/stock', getStockController)
router.get('/list', getProductsListController)
router.get('/add', getProductAddController)
router.post('/add', postProductAddController)

export { router as productRouter };