const express = require('express');
const app = express();
const PORT = 8081;
const { engine } = require('express-handlebars');

const moment = require('moment');
const timestamp = moment().format('h:mm a');

const Messages = require('./container/messagesContainer');
const Products = require('./container/productsContainer');
const messagesContainer = new Messages("mensajes");
const productsContainer = new Products("productos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Implementación del server con socket
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));

app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

app.get('/', async (req, res) => {
  res.render('productslist');
});



// Corre cuando se conecta un cliente
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  // Muestra la lista completa de productos al cliente
  socket.emit("product-list", await productsContainer.getAll());

  // Muestra el historial completo de mensajes al cliente desde SQLite

  socket.emit("msg-list", await messagesContainer.getAll());

  // Recibe producto del cliente
  socket.on("product", async (data) => {

    // Guarda el producto nuevo en productos.json
    await productsContainer.save(data);

    // Muestra el producto por consola
    console.log('Se recibió un producto nuevo', "producto:", data);

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.emit("product-list", await productsContainer.getAll());

  });

  // Recibe mensaje del cliente
  socket.on("msg", async (data) => {

    // Muestra el mensaje por consola
    console.log('Se recibio un msg nuevo', "msg:", data);

    // Guarda el mensaje nuevo en mensaje en la base SQLite
    await messagesContainer.save({ socketid: socket.id, timestamp: timestamp, ...data });



    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje desde SQLite
    io.emit("msg-list", await messagesContainer.getAll());

  });
});


