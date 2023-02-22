const ContenedorFirebase = require("../../container/contenedorFirebase");

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productos')
    }
}

export default ProductosDaoFirebase;