class Cart {
    constructor(products) {
        this.timestamp = new Date().toLocaleString();
        this.products = products || [];
    }
}

module.exports = Cart;