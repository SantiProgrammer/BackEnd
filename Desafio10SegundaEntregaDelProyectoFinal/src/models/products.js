class Product {
    constructor(nombre, description, thumbnail, precio, stock) {
        this.timestamp = new Date().toLocaleString();
        this.nombre = nombre || "";
        this.description = description || "";
        this.thumbnail = thumbnail || "";
        this.precio = precio || "";
        this.stock = stock || "";
    }
}

module.exports = Product;