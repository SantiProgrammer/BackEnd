/* Socket */

import { loggers } from "winston";
import { DAO } from "../DAOs/DAOsFactory.js";


export const socketStart = (io) => {

    io.on("connection", async (socket) => {
        try {
           /*  socket.emit("messagesHistory", await DAO.getMessagesData() ) */

            socket.on("newMessageData", async (data) => {
                console.log("newMessageData:", data);
                /* await DAO.postMessageData(data) */
            })

        } catch (e) {
            loggers.log("error",`❌ Error socket: ${e}` )
            
        }
    })

}


/* io.on("connection", async (socket) => {
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
}); */


/* Socket io */

// io.on("connection", async (socket) => {
//     try {
//         console.log(`Nuevo cliente conectado ${socket.id}`);
//        /*  socket.emit("messagesHistory", await DAO.getMessagesData() ) */

//         socket.on("newMessageData", async (data) => {
//             console.log("newMessageData:", data);
//             /* await DAO.postMessageData(data) */
//         })

//     } catch (e) {
//         loggers.log("error",`❌ Error socket: ${e}` )
        
//     }
// });