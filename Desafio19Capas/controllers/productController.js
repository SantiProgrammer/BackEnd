import { getProductService, postProductService } from '../services/productServices.js'

import logger from '../utils/winston.js'

export const getProductController = async (req, res) => {
    try {
        const data = await getProductService()
        res.json(data)
    } catch (e) {
        logger.log('error', `❌ Error cant get product controller ${e}`);
    }
}

export const getProductsListController = async (req, res) => {
    res.render('productList', { layout: 'logged' })
};


export const getProductAddController = async (req, res) => {
    res.render('productAdd', { layout: 'logged' })
};


export const postProductController = async (req, res) => {
    try {
        const data = req.body
        await postProductService(data)
        res.render('productAdd', { layout: 'logged' })
    } catch (e) {
        logger.log('error', `❌ Error adding product Controller: ${e}`);
    }
};





