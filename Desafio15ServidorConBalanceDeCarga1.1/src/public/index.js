const socket = io();

/* Desnormalizacion */
const authorSchema = new normalizr.schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchema = new normalizr.schema.Entity('messages', {
    author: authorSchema
})

const chatSchema = new normalizr.schema.Entity("chats", {
    messages: [messageSchema]
})



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

    // Porcentaje deberia ser algo asi ...... idea pero no funciona aun

    const totalNormal = JSON.stringify(dataMsg, null, 4).length
    const normalizado = JSON.stringify(data, null, 4).length

    var porcentaje = (normalizado / totalNormal) * 100
    var intPorcentaje = Math.round(porcentaje);
    const h5 = document.getElementById('h5')
    h5.innerText = `Compression: ${intPorcentaje} %`


    console.log("Normalizado:", JSON.stringify(dataMsg, null, 4).length)
    console.log("Normal:", JSON.stringify(data, null, 4).length)

    console.log("data:", dataMsg);

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
    console.log('se intento logear');
    socket.emit("userData", { usuario, contraseña });
    return false;
}


// Funcion para enviar productos el backend

function postProducto() {
    const nombreProducto = document.getElementById("nombreProducto").value;
    const precioProducto = document.getElementById("precioProducto").value;
    const urlProducto = document.getElementById("urlProducto").value;
    socket.emit("product", { nombre: nombreProducto, precio: precioProducto, thumbnail: urlProducto });
    return false;
}

// productos FS

socket.on("products-list", (data) => {
    console.log("products-list:" + data);
    let html = '';
    data.forEach(item => {
        html +=
            `
        <div class="products-card">
            <img src="${item.thumbnail}" class="product-img"/>
            <p>Producto: ${item.nombre}</p>
            <p>Precio: $ ${item.precio}</p>
        </div>
        `
    })
    document.getElementById("products-list").innerHTML = html;

});

// Faker productos / productos-test

socket.on("productos-test", (data) => {
    console.log("productos-test:" + data);
    let html = '';
    data.forEach(item => {
        html +=
            `
        <div class="products-card">
            <img src="${item.thumbnail}" class="product-img"/>
            <p>Producto: ${item.title}</p>
            <p>Precio: $ ${item.price}</p>
        </div>
        `
    })
    document.getElementById("productos-test").innerHTML = html;

});



document.getElementById("preventDefault").addEventListener("click", function (event) {
    event.preventDefault()
});

document.getElementById("preventDefault-chat").addEventListener("click", function (event) {
    event.preventDefault()
});


