
import { getStockData } from '../dataBase/mongodb.js';
import { postProductAddData } from '../dataBase/mongodb.js';

export const getStockService = async () => {
    try {
        return await getStockData()
    } catch (e) {
        logger.log('error', `❌ Error cant get stock service : ${e}`);
    }
};

export const postProductAddService = async (data) => {
    try {
        return await postProductAddData(data)


    } catch (e) {
        logger.log('error', `❌ Error adding product : ${e}`);
    }
};
