import express from "express";
const { Router } = express;
const routerCarrito = Router();
import instancia from '../daos/index.js';
import moment from "moment";

const carrito = new instancia.carrito;
const producto = new instancia.producto;

routerCarrito.get("/", async (req, res) => {
  const lista = await carrito.getAll('carritos');
  res.json(lista);
});

routerCarrito.get("/:id", async (req, res) => {
  let { id } = req.params;
  res.json(await carrito.getById(id, 'carritos'));
});

routerCarrito.post("/", async (req, res) => {
  try {
    const timestampCarrito = moment().format("DD / MM / YYYY, h:mm:ss");
    const idCarrito = await carrito.addCart(timestampCarrito);
    res.json(`Se creó un carrito nuevo con el id: ${idCarrito}`);
  } catch {
    res.json("error");
  }
});

routerCarrito.get("/:id/productos", async (req, res) => {
  let { id } = req.params;
  const resultado = await carrito.getProductsFromCart(id);
  res.json(resultado);
});

routerCarrito.post("/:id/productos/:id_prod", async (req, res) => {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;
    let productoParaCarrito = await producto.getById(id_prod, 'productos');
    if (await carrito.getById(id) == "No existe el número de id elegido") {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productoParaCarrito == "No existe el número de id elegido") {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      carrito.addProductToCart(id, productoParaCarrito, id_prod);
      res.json(
        `Se añadio el producto ${productoParaCarrito.nombre} al carrito`
      );
    }
  } catch {
    res.json("error");
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  let { id } = req.params;
  const resultado = await carrito.deleteById(id, 'carritos');
  res.json(resultado);
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    let { id_prod } = req.params;
    let { id } = req.params;
    let productoCarrito = await producto.getById(id_prod, 'productos');
    if (await carrito.getById(id, 'carritos') == "No existe el número de id elegido") {
      res.json('error: "No existe ningún carrito con ese número de id"');
    } else if (productoCarrito == "No existe el número de id elegido") {
      res.json('error: "No existe ningún producto con ese número de id"');
    } else {
      await carrito.deleteProductFromCart(id, id_prod);
      res.json(`Se eliminó el producto del carrito`);
    }
  } catch {
    res.json("error");
  }
});

export default routerCarrito;