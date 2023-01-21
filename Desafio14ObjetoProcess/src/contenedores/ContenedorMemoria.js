class ContenedorMemoria {
  constructor() {
    this.listProducts = [
      {
        id: 1,
        timestamp: "22 / 11 / 2022, 11:50:32",
        nombre: "Red Velvet",
        descripcion: "Pastel de terciopelo rojo",
        codigo: 3245,
        foto: "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg",
        precio: 2000,
        stock: 10,
      },
      {
        id: 2,
        timestamp: "22 / 11 / 2022, 11:26:41",
        nombre: "Budín de limon",
        descripcion: "Alimento de la cocina inglesa",
        codigo: 3223,
        foto: "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png",
        precio: 1000,
        stock: 15,
      },
      {
        id: 3,
        timestamp: "22 / 11 / 2022, 11:44:22",
        nombre: "Brownie",
        descripcion: "Bizcocho de chocolate pequeño",
        codigo: 3251,
        foto: "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG",
        precio: 1500,
        stock: 12,
      },
    ];
    this.listCarts = [
      {
        id: 1,
        timestampCarrito: "22 / 11 / 2022, 11:26:32",
        productos: [
          {
            id: 2,
            timestamp: "22 / 11 / 2022, 11:32:41",
            nombre: "Budín de limon",
            descripcion: "Alimento de la cocina inglesa",
            codigo: 3223,
            foto: "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png",
            precio: 1000,
            stock: 15,
          },
          {
            id: 3,
            timestamp: "22 / 11 / 2022, 11:44:22",
            nombre: "Brownie",
            descripcion: "Bizcocho de chocolate pequeño",
            codigo: 3251,
            foto: "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG",
            precio: 1500,
            stock: 12,
          },
        ],
      },
      {
        id: 2,
        timestampCarrito: "22 / 11 / 2022, 11:48:22",
        productos: [
          {
            id: 1,
            timestamp: "22 / 11 / 2022, 11:49:32",
            nombre: "Red Velvet",
            descripcion: "Pastel de terciopelo rojo",
            codigo: 3245,
            foto: "https://www.elmundoeats.com/wp-content/uploads/2018/05/Red-Velvet-Cake-1.jpg",
            precio: 2000,
            stock: 10,
          },
          {
            id: 2,
            timestamp: "22 / 11 / 2022, 11:53:41",
            nombre: "Budín de limon",
            descripcion: "Alimento de la cocina inglesa",
            codigo: 3223,
            foto: "https://www.cucinare.tv/wp-content/uploads/2020/01/Dise%C3%B1o-sin-t%C3%ADtulo-32.png",
            precio: 1000,
            stock: 15,
          },
          {
            id: 3,
            timestamp: "22 / 11 / 2022, 11:55:22",
            nombre: "Brownie",
            descripcion: "Bizcocho de chocolate pequeño",
            codigo: 3251,
            foto: "https://img2.rtve.es/imagenes/aqui-tierra-receta-brownie-jesus-monedero/1585576217689.JPG",
            precio: 1500,
            stock: 12,
          },
        ],
      },
    ];
  }

  getAll(list) {
    if (list == 'productos'){
      return this.listProducts;
    } else if (list == 'carritos') {
      return this.listCarts;
    } else {
      return 'No existe la lista';
    }
  }

  getById(num, list) {
    try {
      let lista;
      if (list == 'productos'){
        lista = this.listProducts;
      } else if(list == 'carritos'){
        lista = this.listCarts;
      } else {
        return "No existe la lista";
      }
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
      const lista = this.listProducts;
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
      this.listProducts.push(productoNuevo);
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
      const lista = this.listProducts;
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
        this.listProducts[index] = productoNuevo;
        return `Se actualizó el producto ${productoNuevo.nombre}`;
      } else {
        return "No existe el número de id elegido";
      }
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  async deleteById(num, list) {
    try {
      let lista;
      if (list == 'productos'){
        lista = this.listProducts;
      } else if(list == 'carritos'){
        lista = this.listCarts;
      } else {
        return "No existe la lista";
      }
      const index = lista.findIndex((object) => object.id == num);
      if (lista[index]) {
        if (list == 'productos'){
          this.listProducts.splice(index, 1);
          return `Se eliminó con exito`;
        } else if(list == 'carritos'){
          this.listCarts.splice(index, 1);
          return `Se eliminó con exito`;
        }
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
      const lista = this.listCarts;
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
      this.listCarts.push(carritoNuevo);
      return idCarrito;
    } catch {
      console.log("Se ha producido un error");
      return "Se ha producido un error";
    }
  }

  getProductsFromCart(num) {
    try {
      const lista = this.listCarts;
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
    const lista = this.listCarts;
    const index = lista.findIndex((object) => object.id == num);
    lista[index].productos.push(producto);
  }

  async deleteProductFromCart(num, id_prod) {
    const lista = this.listCarts;
    const index = lista.findIndex((object) => object.id == num);
    const indexProduct = lista[index].productos.findIndex(
      (object) => object.id == id_prod
    );
    this.listCarts[index].productos.splice(indexProduct, 1);
  }
}

export default ContenedorMemoria;
