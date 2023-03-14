
import { Router } from 'express';
import {
    getPostProductViewController, getProductController, getProductsListController, postProductController, putProductController, deleteProductController
} from '../controllers/productController.js';

const router = new Router()

router.get('/post', getPostProductViewController)
router.post('/post', postProductController)
router.get('/stock', getProductController)
router.get('/list', getProductsListController)
router.put('/put', putProductController)
router.delete('/delete/:id', deleteProductController)

export { router as productRouter };

