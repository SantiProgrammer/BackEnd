import { getStockService, postProductAddService } from '../services/services.js'

import logger from '../utils/winston.js'

export const getStockController = async (req, res) => {
    try {
        const data = await getStockService()
        res.json(data)
    } catch (e) {
        logger.log('error', `❌ Error cant get stock controller ${e}`);
    }
}

export const getProductsListController = async (req, res) => {
    res.render('productList', { layout: 'logged' })
};


export const getProductAddController = async (req, res) => {
    res.render('productAdd', { layout: 'logged' })
};


export const postProductAddController = async (req, res) => {
    try {
        const data = req.body
        await postProductAddService(data)
        res.render('productAdd', { layout: 'logged' })
    } catch (e) {
        logger.log('error', `❌ Error adding product Controller: ${e}`);
    }
};





