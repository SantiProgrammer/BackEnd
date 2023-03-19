import logger from '../../utils/winston.js';

export class DAOproductsFile {
    getProductData = async () => {
        try {
            return undefined
        } catch (e) {
            logger.log('error', `❌ Error cant get product data: ${e}`);
        }
    };


    postProductData = async (data) => {
        try {
            return undefined
        } catch (e) {
            logger.log('error', `❌ Error adding product data: ${e}`);
        }
    };
}










