const contenedorArchivo = require("../../container/contenedorArchivo");


class CarritosDaoArchivo extends contenedorArchivo {
    constructor() {
        super('carritos.json')
    }

    async guardar(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}


export default CarritosDaoArchivo;