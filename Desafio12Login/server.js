// requires
const express = require('express');
const session = require("express-session");
const router = require("./routes/routes")
const MongoStore = require("connect-mongo");
const app = express();
const PORT = 8081;
const { engine } = require('express-handlebars');
const { normalize, schema, denormalize } = require('normalizr');
const Contenedor = require('./container/contenedor');
const ContenedorMsg = require('./container/contenedorMsg');

// generar productos faker 
const generateFakeProducts = require('./utils/fakerProductGenerator');
const FakeP = generateFakeProducts(5);

const moment = require('moment');
const timestamp = moment().format('h:mm a');

const contenedorProductos = new Contenedor('productos');
const productosFS = contenedorProductos.getAll()
const dataMsg = new ContenedorMsg;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* Autentificacion */
function auth(req, res, next) {
  if (req.session?.user === "santi" && req.session?.admin) {
    return next();
  } else {
    return res.render("noauth");
  }
}

// Implementacion del server con socket
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

//prueba de declarar otra layout
/* app.set('view options', { layout: 'other' }); */

// renderiza el inicio
app.use("/", router);


// renderiza productslist de FS
app.get('/products-list', async (req, res) => {
  res.render('products-list');
});


// renderiza productos-test
app.get('/productos-test', async (req, res) => {
  res.render('productos-test');
});

// renderiza el chat
app.get('/chat', async (req, res) => {
  res.render('chat');
});



/* Normalizacion */

// 1. Definir esquemas
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchema = new schema.Entity('messages', {
  author: authorSchema
})

const chatSchema = new schema.Entity("chats", {
  messages: [messageSchema]
})

// 2. Aplicar Normalizacion (funcion que normaliza datos)
const normalizarData = (data) => {
  const dataNormalizada = normalize({ id: "chatHistory", messages: data }, chatSchema);
  return dataNormalizada;
}

// 3. Normaliza mensajes
const normalizarMensajes = async () => {
  const messages = await dataMsg.getAll();
  const normalizedMessages = normalizarData(messages);
  return normalizedMessages;

}




// Socket.io Corre cuando se conecta un cleinte
io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);

  // Muestra la lista completa de productos al cliente
  socket.emit("products-list", await productosFS);

  //Manda los productos faker al cliente productos-test
  socket.emit("productos-test", await FakeP)

  // Muestra el historial completo de mensajes al cliente
  socket.emit("msg-list", await normalizarMensajes());

  // Recibe prodcuto del cliente
  socket.on("product", async (data) => {

    // Muestra el mensaje por consola
    console.log('Se recibio un producto nuevo', "producto:", data);

    // Guarda el producto nuevo en productos.json
    await contenedorProductos.save(data);



    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.emit("product-list", await productosFS);

  });

  // Recibe mensaje del cliente
  socket.on("msg", async (data) => {

    // Guarda en mensaje nuevo en mensajes.json
    await dataMsg.save({ ...data, timestamp: timestamp });

    // Muestra el mensaje por consola
    console.log('Se recibio un msg nuevo', "msg:", data);

    // Devuelve el historial completo de mensajes al cliente con el nuevo mensaje
    io.sockets.emit("msg-list", await normalizarMensajes());

  });
});


// ************************* Login ****************************

/* guarda sesion en mongo */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://santiagomorera:NBLW114i2jvyU60F@cluster0.1clmwkn.mongodb.net/login",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: { maxAge: 60000 * 10 },

    secret: 'secret',
    resave: false,
    saveUninitialized: false

  })


);



/* Login post */
app.post('/login', async (req, res) => {
  const { body } = req;

  if (body.username !== "santi" || body.password !== "santipass") {
    console.log('Login fail!');
    return res.render("loginfail");
  }

  req.session.user = body.username;
  req.session.admin = true;
  console.log('Login success, user:' + body.username);
  res.render('logged', { layout: 'logged', username: req.session.user })

});

/* Login get */
app.get("/login", (req, res) => {
  res.render('login')

});


/* Showsession */
app.get("/showsession", (req, res) => {
  const mySession = JSON.stringify(req.session, null, 4)

  res.render('session', { layout: 'logged', session: mySession })
});

/* Logout */
app.get("/logout", (req, res) => {
  const userInfo = []
  if (userInfo.length === 0) {
    userInfo.push(req.session.user)
  }
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render('logout', { username: userInfo });
    }
  });
});

app.get("/informacionconfidencial", auth, (req, res) => {
  res.render("private", { layout: 'logged', username: req.session.user, admin: req.session.admin })
});

// form
app.get('/form', auth, (req, res) => {
  res.render('form', { layout: 'logged' });
});




