import { ContenedorMongoDB } from "../../container/ContenedorMongoDB.js";
import { ModeloProductos } from "../../models/productos.js";

export class ProductosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: 'productos',
      schema: ModeloProductos.ProductosSchema,
    });
  }
}

export default ProductosDaoMongoDB;
