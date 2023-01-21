import { ContenedorFirebase } from "../../contenedores/ContenedorFirebase.js";

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }
}

export default CarritosDaoFirebase