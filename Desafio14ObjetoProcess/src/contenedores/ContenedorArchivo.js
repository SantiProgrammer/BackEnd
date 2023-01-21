import fs from "fs";

class ContenedorArchivo {
  constructor(path) {
    this.filePath = path;
  }

  getAll() {
    const lista = fs.readFileSync(this.filePath);
    return JSON.parse(lista);
  }

  getById(num) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.filePath));
      const index = lista.findIndex((object) => object.id == num);
      if (lista[index]) {
        return lista[index];
      } else {
        return "No existe el número de id elegido";
      }
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async save(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.filePath));
      let highestid = Math.max(...lista.map((el) => el.id));
      let id = highestid + 1;
      let productoNuevo = {
        id: id,
        timestamp: timestamp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      };
      lista.push(productoNuevo);
      console.log(lista);
      await fs.promises.writeFile(this.filePath, JSON.stringify(lista));
      return id;
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
    try {
      const lista = JSON.parse(fs.readFileSync(this.filePath));
      const index = lista.findIndex((object) => object.id == num);
      if (lista[index]) {
        const productoNuevo = {
          id: num,
          timestamp: timestamp,
          nombre: nombre,
          descripcion: descripcion,
          codigo: codigo,
          foto: foto,
          precio: precio,
          stock: stock,
        };
        lista[index] = productoNuevo;
        await fs.promises.writeFile(this.filePath, JSON.stringify(lista));
        return `Se actualizó el producto ${productoNuevo.nombre}`;
      } else {
        return "No existe el número de id elegido";
      }
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async deleteById(num) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.filePath));
      const index = lista.findIndex((object) => object.id == num);
      if (lista[index]) {
        lista.splice(index, 1);
        await fs.promises.writeFile(this.filePath, JSON.stringify(lista));
        return `Se eliminó con exito`;
      } else {
        return "No existe el número de id elegido";
      }
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async addCart(timestampCarrito) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.filePath));
      let idCarrito;
      if (lista.length > 0) {
        let highestid = Math.max(...lista.map((el) => el.id));
        idCarrito = highestid + 1;
      } else {
        idCarrito = 1;
      }

      let carritoNuevo = {
        id: idCarrito,
        timestampCarrito: timestampCarrito,
        productos: [],
      };
      lista.push(carritoNuevo);
      await fs.promises.writeFile(this.filePath, JSON.stringify(lista));
      return idCarrito;
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  getProductsFromCart(num) {
    try {
      const lista = JSON.parse(fs.readFileSync(this.filePath));
      const index = lista.findIndex((object) => object.id == num);
      if (lista[index]) {
        return lista[index].productos;
      } else {
        return "No existe el número de id elegido";
      }
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async addProductToCart(num, producto) {
    const lista = JSON.parse(fs.readFileSync(this.filePath));
    const index = lista.findIndex((object) => object.id == num);
    lista[index].productos.push(producto);
    await fs.promises.writeFile(this.filePath, JSON.stringify(lista));
  }

  async deleteProductFromCart(num, id_prod) {
    const lista = JSON.parse(fs.readFileSync(this.filePath));
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex(
      (object) => object.id == id_prod
    );
    lista[index].productos.splice(indexProduct, 1);
    await fs.promises.writeFile(this.filePath, JSON.stringify(lista));
  }
}

export default ContenedorArchivo;
