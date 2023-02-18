const { Router } = require("express");
const cartRouter = Router();
//const veryfyRole = require("../middlewares/admin");

const Cart = require("../models/cart");
const Container = require("../container/container");

const controller = new Container("cart");
const controllerProd = new Container("products");

cartRouter.post("/", async (req, res) => {
    try {
        const carts = await controller.getAll();
        if (carts.length >= 1) {
            res.json("Ya existe un carrito!")
        } else {
            let cart = new Cart();
            const saveCart = controller.save(cart)
            res.json("Se creo un carrito exitosamente!", saveCart);
        }

    } catch (error) {
        console.log(error);
    }

});

cartRouter.delete("/:id", async (req, res) => {
    let { id } = req.params;
    res.json(await controller.deleteById(id));
});



cartRouter.get("/:id/products", async (req, res) => {
    let { id } = req.params;

    let cart = await controller.getById(id);
    console.log(cart.products);
    if (cart.products == undefined) {
        res.json({ response: "No hay productos" });
    } else {
        res.json({ id: cart.id, products: cart.products });
    }

});

cartRouter.post('/:id/products/:id_prod', async (req, res) => {
    const { id, id_prod } = req.params;
    const productoPedido = await controllerProd.getById(parseInt(id_prod));
    const allCarts = await controller.getAll();
    const cartPedido = allCarts.find((item) => Number(item.id) == Number(id));
    const newProductList = [...cartPedido.products, productoPedido];
    controller.updateCartById(cartPedido.id, cartPedido.timestamp, newProductList);
    res.json({ succes: true, msg: "Producto añadido" });
})



cartRouter.delete("/:id/products/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params;
    const cart = await controller.getById(id);

    const foundElementIndex = cart.products.findIndex(
        (element) => element.id == id_prod
    );

    cart.products.splice(foundElementIndex, 1);
    res.send({
        success: true,
        message: `Se elimino del carrito ${id} el producto con el ID ${id_prod}`,
    });


    console.log(cart.products);

    const updatedCart = await controller.updateCartById(id, cart.products, cart.timestamp);
    res.send({ success: true, cart: updatedCart });


});


module.exports = cartRouter;