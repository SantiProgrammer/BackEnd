import { ContenedorMongoDB } from "../../container/ContenedorMongoDB.js";
import { ModeloCarritos } from "../../models/carritos.js";

export class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super({
      name: 'carritos',
      schema: ModeloCarritos.CartsSchema,
    });
  }
}

export default CarritosDaoMongoDB;