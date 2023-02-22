const ContenedorFirebase = require('../../container/contenedorFirebase.js');

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }
}

export default CarritosDaoFirebase