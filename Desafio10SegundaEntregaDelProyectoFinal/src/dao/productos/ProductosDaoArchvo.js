const ContenedorArchivo = require("../../container/contenedorArchivo.js");

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('productos.json')
    }
}

export default ProductosDaoArchivo;