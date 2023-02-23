import { config } from "dotenv";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import CarritoDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";

config();

const instancias = [
    {
        nombre: ProductosDaoMongoDB,
        id: 'mongo',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoMongoDB,
        id: 'mongo',
        descripcion: 'carrito'
    }
]

const instancia = instancias.filter(i => i.id == process.env.INSTANCIA);
// console.log(instancia)

const resultado = {
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre,
}

export default resultado;

