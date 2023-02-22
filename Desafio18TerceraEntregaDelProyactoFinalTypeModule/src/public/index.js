// Socket.io
const socket = io();

// Desnormalizacion
const authorSchema = new normalizr.schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchema = new normalizr.schema.Entity('messages', { author: authorSchema });
const chatSchema = new normalizr.schema.Entity("chats", { messages: [messageSchema] });

// Envia mensajes al backend
function enviarMsg() {
    const emailId = document.getElementById("email-id").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const alias = document.getElementById("alias").value
    const avatar = document.getElementById("avatar").value;
    const chatInput = document.getElementById("inputMsg").value;
    const userData = {
        author: {
            email: emailId,
            nombre: nombre,
            apellido: apellido,
            edad: edad,
            alias: alias,
            avatar: avatar
        },
        text: chatInput,
    }
    console.log(userData);
    chatInput.value = "";
    socket.emit("msg", userData);
    return false;
}

// Recibe mensajes del back y los renderiza en el DOM
socket.on("msg-list", (data) => {
    const dataMsg = normalizr.denormalize(data.result, chatSchema, data.entities)
    const totalNormal = JSON.stringify(dataMsg, null, 4).length
    const normalizado = JSON.stringify(data, null, 4).length
    var porcentaje = (normalizado / totalNormal) * 100
    var intPorcentaje = Math.round(porcentaje);
    const h5 = document.getElementById('h5');
    h5.innerText = `Compression: ${intPorcentaje} %`;
    let html = '';
    dataMsg.messages.forEach(item => {
        html +=
            `
                <div class="msj-container" >
                <img src="${item.author.avatar}" class="avatar" alt=""><p class="p-email">${item.timestamp} ${item.author.alias} dice: <br> <span> ${item.text}</span> </p>
                </div> 
                `
    })
    document.getElementById("mgs-area").innerHTML = html;
});

// Funcion para LogIn 
function enviarLog() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    socket.emit("userData", { usuario, contraseña });
    return false;
}


// Funcion para enviar productos al backend
function postProducto() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const precioProducto = document.getElementById("precioProducto").value;
    const urlProducto = document.getElementById("urlProducto").value;
    socket.emit("product", { nombre: nombreProducto, precio: precioProducto, thumbnail: urlProducto });
    return false;
}

// productos Mongo
/* socket.on("products-list", (data) => {
    let html = '';
    data.forEach(item => {
        html +=
            `
        <div class="products-card">
            <img src="${item.foto}" class="product-img"/>
            <p>Producto: ${item.nombre}</p>
            <p>Precio: $ ${item.precio}</p>
            <div class="products-card-footer" >
            <form action="#" method="POST" >
            <button  class="btn btn-primary" type="submit">Agregar</button>
            </form> 
            </div>
        </div>
        `
    })
    document.getElementById("products-list").innerHTML = html;
}); */
socket.on("products-list", (data) => {
    console.log('data productos en socket frot:', data);
    data.forEach((producto) => {
        const productosWrapper = document.getElementById("productos-wrapper")
        let card = document.createElement("div");
        card.innerHTML = `
           <div class="card m-2 p-3 d-flex justify-content-between ">
                 <img src="${producto.foto}" class="product-img" alt="${producto.nombre}">
                 <p <strong></strong>${producto.nombre} </p>
                 <p <strong>Precio:</strong>$ ${producto.precio}</p>
                 <p <strong>Descripcion:</strong>${producto.descripcion}</p>
                 
                 <div class="products-card-footer" >
                 <form class="button-form" action="http://localhost:8080/api/carrito/63f237469056899a969e2c51/productos/${producto._id}" method="POST" >
                 <button  class="btn btn-primary" type="submit">Agregar al carrito</button>
                 </form> 
                 </div>
           </div> `;
        productosWrapper.appendChild(card);
        /*    const boton = document.getElementById(`p${producto.id}`)
           boton.addEventListener("click", () => {
               agregarAlCarrito(producto.id)
           }) */
    })
});

/* AQUI ME QUEDE */
socket.on("carrito-list", (data) => {
    const carritoWrapper = document.getElementById("carrito-wrapper")
    data.forEach((producto) => {
        let card = document.createElement("div")
        card.innerHTML = `
      <figure class="card mb-4">
        <div class="row g-0">
            <div class="col-md-3 img-carrito">
                <img src="${producto.foto}" class="img-fluid rounded-start" alt="${producto.foto}">
            </div>
            <div class="col-md-6">
               <div class="card-detalle">
                  <p class="card-title">${producto.nombre} </p>
                  <p class="card-text">Cant: ${producto.cant}</p>
                  <p class="card-text">Total: $ ${producto.precio}</p>
               </div>
            </div>
            <div class="col-md-3 d-flex">
                  <button class="btn btn-primary eliminar" id="eliminar${producto._id}">Eliminar</button>
            </div>
        </div>
      </figure
      `
        carritoWrapper.appendChild(card);

        /*  const botonDelete = document.getElementById(`eliminar${producto.id}`)
         botonDelete.addEventListener('click', () => {
             deleteCart(producto.id)
         }) */


    });
});

// Faker productos / productos-test
socket.on("productos-test", (data) => {
    data.forEach((producto) => {
        const productosWrapper = document.getElementById("productos-test")
        let card = document.createElement("div");
        card.innerHTML = `
           <figure class="products-card">
                 <img src="${producto.thumbnail}" class="product-img" alt="${producto.title}">
                 <p class="card-title">${producto.title} </p>
                 <p class="card-text">$ ${producto.price}</p>
                 <button class="btn btn-primary" id="p${producto.id}">Agregar al Carrito</button>
           </figure> `;
        productosWrapper.appendChild(card);
        const boton = document.getElementById(`p${producto.id}`)
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    })
});

document.getElementById("preventDefault").addEventListener("click", function (event) {
    event.preventDefault()
});

document.getElementById("preventDefault-chat").addEventListener("click", function (event) {
    event.preventDefault()
});


