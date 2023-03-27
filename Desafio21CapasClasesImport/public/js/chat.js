
const socket = io();

Desnormalizacion
const authorSchema = new normalizr.schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchema = new normalizr.schema.Entity('messages', { author: authorSchema });
const chatSchema = new normalizr.schema.Entity("chats", { messages: [messageSchema] });

/* Envia mensajes al backend */
function sendMessage() {
    const email = document.getElementById("emailChat").value;
    const name = document.getElementById("nameChat").value;
    const lastname = document.getElementById("lastnameChat").value;
    const age = document.getElementById("ageChat").value;
    const alias = document.getElementById("aliasChat").value
    const avatar = document.getElementById("avatarChat").value;
    const inputMessage = document.getElementById("inputMessageChat").value;
    const newMessageData = {
        author: {
            email: email,
            name: name,
            lastname: lastname,
            age: age,
            alias: alias,
            avatar: avatar
        },
        text: inputMessage,
    }
    inputMessage.value = " ";
    socket.emit("newMessageData", newMessageData);
    return false;
}

/* Recibe mensajes del back y los renderiza en el DOM */
// socket.on("msg-list", (data) => {
//     const dataMsg = normalizr.denormalize(data.result, chatSchema, data.entities)
//     const totalNormal = JSON.stringify(dataMsg, null, 4).length
//     const normalizado = JSON.stringify(data, null, 4).length
//     var porcentaje = (normalizado / totalNormal) * 100
//     var intPorcentaje = Math.round(porcentaje);
//     const h5 = document.getElementById('h5');
//     h5.innerText = `Compression: ${intPorcentaje} %`;
//     let html = '';
//     dataMsg.messages.forEach(item => {
//         html +=
//             `
//                 <div class="msj-container" >
//                 <img src="${item.author.avatar}" class="avatar" alt=""><p class="p-email">${item.timestamp} ${item.author.alias} dice: <br> <span> ${item.text}</span> </p>
//                 </div> 
//                 `
//     })
//     document.getElementById("mgs-area").innerHTML = html;
// });


/* Funcion para enviar productos al backend */
// function postProducto() {
//     const nombreProducto = document.getElementById("nombreProducto").value;
//     const precioProducto = document.getElementById("precioProducto").value;
//     const urlProducto = document.getElementById("urlProducto").value;
//     socket.emit("product", { nombre: nombreProducto, precio: precioProducto, thumbnail: urlProducto });
//     return false;
// }

/* productos Mongo */
// socket.on("products-list", (data) => {
//     data.forEach((producto) => {
//         const productosWrapper = document.getElementById("productos-wrapper")
//         let card = document.createElement("div");
//         card.innerHTML = `
//            <div class="card m-2 p-3 d-flex justify-content-between ">
//                  <img src="${producto.foto}" class="product-img" alt="${producto.nombre}">
//                  <p <strong></strong>${producto.nombre} </p>
//                  <p <strong>Precio:</strong>$ ${producto.precio}</p>
//                  <p <strong>Descripcion:</strong>${producto.descripcion}</p>

//                  <div class="products-card-footer" >
//                  <form class="button-form" action="http://localhost:8080/api/carrito/63f237469056899a969e2c51/productos/${producto._id}" method="POST" >
//                  <button  class="btn btn-primary" type="submit">Agregar al carrito</button>
//                  </form>
//                  </div>
//            </div> `;
//         productosWrapper.appendChild(card);
//         /*    const boton = document.getElementById(`p${producto.id}`)
//            boton.addEventListener("click", () => {
//                agregarAlCarrito(producto.id)
//            }) */
//     })
// });




/* Faker productos / productos-test */
// socket.on("productos-test", (data) => {
//     data.forEach((producto) => {
//         const productosWrapper = document.getElementById("productos-test")
//         let card = document.createElement("div");
//         card.innerHTML = `
//            <figure class="products-card">
//                  <img src="${producto.thumbnail}" class="product-img" alt="${producto.title}">
//                  <p class="card-title">${producto.title} </p>
//                  <p class="card-text">$ ${producto.price}</p>
//                  <button class="btn btn-primary" id="p${producto.id}">Agregar al Carrito</button>
//            </figure> `;
//         productosWrapper.appendChild(card);
//         const boton = document.getElementById(`p${producto.id}`)
//         boton.addEventListener("click", () => {
//             agregarAlCarrito(producto.id)
//         })
//     })
// });

// document.getElementById("preventDefault").addEventListener("click", function (event) {
//     event.preventDefault()
// });

document.getElementById("preventDefault").addEventListener("click", function (event) {
    event.preventDefault()
});


