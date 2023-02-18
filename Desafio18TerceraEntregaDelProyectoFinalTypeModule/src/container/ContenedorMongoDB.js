import mongoose from "mongoose";
import { ModeloCarritos } from "../models/carritos.js";
import { ModeloProductos } from "../models/productos.js";

function validacionId(array, id) {
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class ContenedorMongoDB {
  constructor({ name, schema }) {
    this.model = mongoose.model(name, schema);
  }

  async getAll() {
    const resultado = await this.model.find({});
    return resultado;
  }

  async getById(num) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, num);
    if (validacion) {
      let resultado = await this.model.find({ _id: num });
      resultado = resultado[0];
      return resultado
    } else {
      return "No existe el número de id elegido";
    }
  }

  async save(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
    try {
      const productoNuevo = new ModeloProductos({
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock
      });
      await productoNuevo.save();
      const aux = await ModeloProductos.find({ nombre: nombre });
      const id = aux[0]._id;
      return id
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error"
    }
  }

  async replace(
    num,
    timestamp,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock
  ) {
    const lista = await ModeloProductos.find({});
    const validacion = validacionId(lista, num);
    if (validacion) {
      await ModeloProductos.updateOne(
        { _id: num },
        {
          $set: {
            timestamp: timestamp,
            nombre: nombre,
            descripcion: descripcion,
            codigo: codigo,
            foto: foto,
            precio: precio,
            stock: stock
          },
        }
      );
      const aux = await ModeloProductos.find({ _id: num });
      return `Se actualizó el producto ${aux[0].nombre}`
    } else {
      return "No existe el número de id elegido";
    }
  }

  async deleteById(num) {
    const lista = await this.model.find({});
    const validacion = validacionId(lista, num);
    if (validacion) {
      await this.model.deleteOne({ _id: num });
      return `Se eliminó con exito`;
    } else {
      return "No existe el número de id elegido";
    }
  }

  async addCart(timestamp) {
    try {
      const carritoNuevo = new ModeloCarritos({
        timestamp: timestamp,
        productos: []
      });
      await carritoNuevo.save();
      const aux = await ModeloCarritos.find({ timestamp: timestamp });
      const id = aux[0]._id;
      return id
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error"
    }
  }

  async getProductsFromCart(id) {
    const lista = await this.model.find({});
    const index = lista.findIndex((object) => object.id == id);
    return lista[index].productos
  }

  async addProductToCart(num, producto, id_prod) {
    const lista = await this.model.find({});
    const index = lista.findIndex((object) => object.id == num);
    lista[index].productos.push(producto)
    await this.model.updateOne(
      { _id: num },
      {
        $set: {
          productos: lista[index].productos
        }
      })
  }

  async deleteProductFromCart(num, id_prod) {
    const lista = await this.model.find({});
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex(
      (object) => object.id == id_prod
    );
    lista[index].productos.splice(indexProduct, 1);
    await this.model.updateOne(
      { _id: num },
      {
        $set: {
          productos: lista[index].productos
        }
      })
  }
}

export { ContenedorMongoDB };
