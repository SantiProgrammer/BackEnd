import { Product } from "../../schemas/product.js";
import logger from '../../utils/winston.js';

export class DAOproductsMongo {

    getProductData = async () => {
        try {
            return await Product.find({})
        } catch (e) {
            logger.log('error', `❌ Error cant get product data: ${e}`);
        }
    };

    postProductData = async (data) => {
        try {
            await Product.create(data)
        } catch (e) {
            logger.log('error', `❌ Error cant post product data: ${e}`);
        }
    };


    putProductData = async (data) => {
        try {
            await Product.replaceOne(data)
        } catch (e) {
            logger.log('error', `❌ Error cant put product data: ${e}`);
        }
    };

    deleteProductData = async (id) => {
        try {
            await Product.deleteOne({nombre: AxiosProduct})
        } catch (e) {
            logger.log('error', `❌ Error cant delete product data: ${e}`);
        }
    };
}














