const ContenedorMemoria = require('../../container/contenedorMemoria');

class CarritosDaoMemoria extends ContenedorMemoria {

    constructor() {
        super()
    }


    async guardar(carrito = { productos: [] }) {
        return super.guardar(carrito)

    }

}


export default CarritosDaoMemoria