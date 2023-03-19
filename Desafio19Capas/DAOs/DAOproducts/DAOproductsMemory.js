import logger from '../../utils/winston.js';

let products = [
    {
        nombre: "Leche",
        precio: 20,
        descripcion: "Leche fria como hielo",
        thumbnail: "https://cdn-icons-png.flaticon.com/512/372/372973.png",
        stock: 10
    }
]

export class DAOproductsMemory {

    getProductData = async () => {
        try {
            return products
        } catch (e) {
            logger.log('error', `❌ Error cant get products data: ${e}`);
        }
    };

    postProductData = async (data) => {
        try {
            return products.push(data)
        } catch (e) {
            logger.log('error', `❌ Error cant post product data: ${e}`);
        }
    };

}










