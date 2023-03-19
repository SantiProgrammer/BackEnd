import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import crypto from "crypto";

//server.js
const schema = buildSchema(`
  type Product {
    id: ID!
    nombre: String,
    precio: String,
    descripcion: String,
    thumbnail: String,
    stock: String
  }

  input ProductInput {
    nombre: String,
    precio: String,
    descripcion: String,
    thumbnail: String,
    stock: String
  }

  type Query {
    getProducts(nombre: String,
    precio: String,
    descripcion: String,
    thumbnail: String,
    stock: String):[Product]
 
  }

  type Mutation {
    createProduct(datos: ProductInput):Product
    updateProduct(id: ID!, datos: ProductInput ): Product
    deleteProduct( id: ID! ): Product
  }
`);

const app = express();

app.use(express.static("public"));

app.use(
  "/products",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getProducts,
      createProduct,
      deleteProduct,
      updateProduct,
    },
    graphiql: true,
  })
);

const PORT = 8085;
app.listen(PORT, () => {
  const msg = ` ✅ Servidor ON corriendo en puerto: http://localhost:${PORT}/products`;
  console.log(msg);
});

class Product {
  constructor(id, { nombre, precio, descripcion, thumbnail, stock }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.thumbnail = thumbnail;
    this.stock = stock;
  }
}

const productsMap = {};


 function getProducts({ campo, valor }) {
    const products = Object.values(productsMap)
    if (campo && valor) {
        return products.filter(p => p[ campo ] == valor);
    } else {
        return products;
    }
 }
 
 function createProduct({ datos }) {
    const id = crypto.randomBytes(10).toString('hex');
    const nuevaProduct= new Product(id, datos)
    productsMap[ id ] = nuevaProduct;
    return nuevaProduct;
 }

 function updateProduct({ id, datos }) {
    if (!productsMap[ id ]) {
        throw new Error('product not found');
    }
    const productActualizado = new Product(id, datos)
    productsMap[ id ] = productActualizado;
    return productActualizado;
 }
 
 function deleteProduct({ id }) {
    if (!productsMap[ id ]) {
        throw new Error('product not found');
    }
    const productBorrado = productsMap[ id ]
    delete productsMap[ id ];
    return productBorrado;
 }
 
