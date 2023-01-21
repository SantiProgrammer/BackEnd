import ProductosDaoArchivos from "./productos/ProductosDaoArchivo.js";
import CarritoDaoArchivos from "./carritos/CarritosDaoArchivos.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import CarritoDaoMemoria from "./carritos/CarritosDaoMemoria.js";
import { config } from "dotenv";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";
import CarritoDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";
import mongoose from 'mongoose';
import { connect } from 'mongoose';
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import CarritosDaoFirebase from "./carritos/CarritosDaoFirebase.js";

config();

const instancias = [
    {
        nombre: ProductosDaoArchivos,
        id: 'archivo',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoArchivos,
        id: 'archivo',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoMemoria,
        id: 'memoria',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoMemoria,
        id: 'memoria',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoMongoDB,
        id: 'mongo',
        descripcion: 'producto'
    },
    {
        nombre: CarritoDaoMongoDB,
        id: 'mongo',
        descripcion: 'carrito'
    },
    {
        nombre: ProductosDaoFirebase,
        id: 'firebase',
        descripcion: 'producto'
    },
    {
        nombre: CarritosDaoFirebase,
        id: 'firebase',
        descripcion: 'carrito'
    },
]

const instancia = instancias.filter(i => i.id == process.env.INSTANCIA);
console.log(instancia)

const resultado = {
    [instancia[0].descripcion]: instancia[0].nombre,
    [instancia[1].descripcion]: instancia[1].nombre,
}

async function connectMongo() {
    try {
      await connect(process.env.MongoURL, { useNewUrlParser: true });
      console.log('me conecte!');
    } catch (e) {
      console.log(e);
      throw 'can not connect to the db'
    }
}

if (instancia[0].id == 'mongo'){
    connectMongo();
}

export default resultado;