const contenedorMongoDb = require("../../container/contenedorMongoDb");
const config = require("../../config/config.js");

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(config.option.firebase, 'productos')
    }
}