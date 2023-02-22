const ContenedorMongoDb = require('../../container/contenedorMongoDb');

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }


    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)

    }

}


export default CarritosDaoMongoDb