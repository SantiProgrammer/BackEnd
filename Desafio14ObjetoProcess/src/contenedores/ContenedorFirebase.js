import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../privi.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log("me conecte");
const db = getFirestore();

function validacionId(array, id) {
  array = array.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }
  async getAll() {
    const res = await this.coleccion.get();
    let arrayRes = res.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
    return arrayRes;
  }

  async getById(num) {
    const lista = await this.coleccion.get();
    const validacion = validacionId(lista, num);
    if (validacion) {
      let resultado = await this.coleccion.doc(num).get();
      return resultado.data();
    } else {
      return "No existe el número de id elegido";
    }
  }

  async save(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
    try {
      let res;

      res = await this.coleccion.add({
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      });
      return res.id;
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
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
    const lista = await this.coleccion.get();
    const validacion = validacionId(lista, num);
    if (validacion) {
      await this.coleccion.doc(num).update({
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      });
      return "El producto se actualizó con exito";
    } else {
      return "No existe el id elegido";
    }
  }

  async deleteById(num) {
    const lista = await this.coleccion.get();
    const validacion = validacionId(lista, num);
    if (validacion) {
      await this.coleccion.doc(num).delete();
      return `Se eliminó con exito`;
    } else {
      return "No existe el número de id elegido";
    }
  }

  async addCart(timestamp) {
    try {
      let res;

      res = await this.coleccion.add({
        timestamp: timestamp,
        productos: [],
      });
      return res.id;
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async getProductsFromCart(id) {
    let resultado = await this.coleccion.doc(id).get();
    resultado = resultado.data();
    return resultado.productos;
  }

  async addProductToCart(num, producto, id_prod) {
    let resultado = await this.coleccion.doc(num).get();
    resultado = resultado.data();
    producto["id"] = id_prod;
    resultado.productos.push(producto);
    await this.coleccion.doc(num).update({
      productos: resultado.productos,
    });
  }

  async deleteProductFromCart(num, id_prod) {
    let resultado = await this.coleccion.doc(num).get();
    resultado = resultado.data();
    const indexProduct = resultado.productos.findIndex(
      (object) => object.id == id_prod
    );
    resultado.productos.splice(indexProduct, 1);
    await this.coleccion.doc(num).update({
      productos: resultado.productos,
    });
  }
}

export { ContenedorFirebase };
