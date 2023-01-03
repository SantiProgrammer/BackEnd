const { Router } = require("express");
const veryfyRole = require("../middlewares/admin");
const Container = require("../container/container");
const Product = require("../models/products");
const controller = new Container("products");

const controllerCart = new Container("cart");

const moment = require('moment');
const timestamp = moment().format('h:mm a');

const productsRouter = Router();


productsRouter.get("/", async (req, res) => {
    const products = await controller.getAll()
    const carts = await controllerCart.getAll()

    if (products) {
        //res.render('pages/products', { products, carts });
        res.json(products);
    } else {
        res.json({ error: true, msj: "No se pudo obtener el listado de productos" });
    }

});


productsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await controller.getById(id);
    if (!product) {
        res.json({ error: true, msj: "id no encontrado" });
    } else {
        res.send({ success: true, product: product });
    }
});


productsRouter.post('/', veryfyRole, async (req, res) => {
    const { body } = req;
    let product = new Product(
        body.nombre,
        body.description,
        body.thumbnail,
        body.precio,
        body.stock
    );

    try {
        await controller.save({ ...product });
        res.send({ success: true, msj: `Producto guardado exitosamente!` });
    } catch {
        res.json({ error: true, msj: "No se pudo guardar el producto" });
    }
});


productsRouter.put('/:id', veryfyRole, async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, thumbnail } = req.body;
        await controller.updateById(id, nombre, precio, thumbnail);


    } catch (error) {
        res.json({ error: true, msj: "error" });
    }
});

productsRouter.delete('/:id', veryfyRole, async (req, res) => {
    try {
        const { id } = req.params;
        await controller.deleteById(id);
        return res.json({ success: true, msj: "Producto borrado!" });

    } catch (error) {
        res.json({ error: true, msg: 'no se pudo borrar el producto' });
    }
});

module.exports = productsRouter;

