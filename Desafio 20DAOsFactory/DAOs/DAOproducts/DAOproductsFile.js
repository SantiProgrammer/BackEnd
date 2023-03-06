import logger from '../../utils/winston.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export class DAOproductsFile {

    getProductData = async () => {
        try {
            const data = await fs.promises.readFile(`${__dirname}\\productStock.json`)
            const dataParse = JSON.parse(data)
            return dataParse
        } catch (e) {
            logger.log('error', `❌ Error cant get product data: ${e}`);
        }
    };


    postProductData = async (data) => {
        try {
            return await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 3))
        } catch (e) {
            logger.log('error', `❌ Error adding product data: ${e}`);
        }
    };
}










