import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./src/db/carrito.txt")
    }
}

export default CarritosDaoArchivo;