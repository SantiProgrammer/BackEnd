/* Socket */



io.on("connection", async (socket) => {
    try {
        socket.emit("products-list", await productosFS);
        socket.emit("productos-test", await FakeP)
        socket.emit("msg-list", await normalizarMensajes());
        socket.on("product", async (data) => {
            await containerFSProductos.save(data);
            io.sockets.emit("product-list", await productosFS);
        });

        socket.on("msg", async (data) => {
            await containerFSMensajes.save({ ...data, timestamp: timestamp });
            io.sockets.emit("msg-list", await normalizarMensajes());
        });

    } catch (e) {
        wLogger.log('error', e)
    }
});