import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./src/db/productos.txt")
    }
}

export default ProductosDaoArchivo;