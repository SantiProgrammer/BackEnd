import { DAO } from "../DAOs/DAOsFactory.js";

export const getProductService = async () => {
    try {
        return await DAO.getProductData()
    } catch (e) {
        logger.log('error', `❌ Error cant get product service: ${e}`);
    }
};

export const postProductService = async (data) => {
    try {
        return await DAO.postProductData(data)
    } catch (e) {
        logger.log('error', `❌ Error cant post product: ${e}`);
    }
};

export const putProductService = async(data) => {
    try {
        return await DAO.putProductData(data)
    } catch (e) {
        logger.log('error', `❌ Error cant put product: ${e}`);
    }
}

export const deleteProductService = async(id) => {
    try {
        return await DAO.deleteProductData(id)
    } catch (e) {
        logger.log('error', `❌ Error cant delete product whit id:_${id}: ${e}`);
    }
}