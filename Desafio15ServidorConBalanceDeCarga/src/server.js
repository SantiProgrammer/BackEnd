const express = require("express");
const session = require("express-session");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Usuarios = require("./models/usuarios");

const bcrypt = require("bcrypt");
const routes = require("./routes/routes");

const routesChat = require("./routes/routesChat")

const mongoose = require("mongoose");
const { engine } = require('express-handlebars');

const PORT = 8080;

const redis = require("redis");
const client = redis.createClient({
  legacyMode: true,
});
client
  .connect()
  .then(() => console.log("\x1b[32m", "Connected to REDIS ✅"))
  .catch((e) => {
    console.error(e);
    throw "can not connect to Redis! ❌";
  });
const RedisStore = require("connect-redis")(session);

mongoose
  .connect("mongodb+srv://santiagomorera:NBLW114i2jvyU60F@cluster0.1clmwkn.mongodb.net/ecommerce")
  .then(() => console.log("\x1b[32m", "Connected to Mongo ✅"))
  .catch((e) => {
    console.error(e);
    throw "can not connect to the mongo! ❌";
  });


function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }
      // no corto por error, ni corto por sin user, paso! ...
      return done(null, user);
    });
  })
);


passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Usuarios.findOne({ username: username }, function (err, user) {
        if (err) {

          res.render('usuario-registrado');
          console.log("❌ Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          console.log("User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("❌ Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful ✅");
          return done(null, userWithId);
        });
      });
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

const app = express();

app.use(
  session({
    store: new RedisStore({ host: "localhost", port: 6379, client, ttl: 300 }),
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 86400000, // 1 dia
    },
    admin: true,
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", routes.getRoot);
app.get("/login", routes.getLogin);
app.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  routes.postLogin
);
app.get("/faillogin", routes.getFaillogin);
app.get("/signup", routes.getSignup);
app.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postSignup
);
app.get("/failsignup", routes.getFailsignup);
app.get("/logout", routes.getLogout);


// renderiza el chat
app.get('/chat', routesChat.GetChat);

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  const admin = JSON.stringify(req.session.admin);
  res.render("private", { layout: 'logged', user, admin })
});

app.get("/form", checkAuthentication, (req, res) => {
  res.render('form', { layout: 'logged' });
});




app.get("/showsession", (req, res) => {
  const mySession = JSON.stringify(req.session, null, 4)
  req.session.touch()
  /*   res.json(req.session) */
  res.render('session', { layout: 'logged', session: mySession })
});

app.get('/form', checkAuthentication, (req, res) => {
  res.render('form', { layout: 'logged' });
});

app.get('/products-list', async (req, res) => {
  res.render('products-list');
});

app.get('/productos-test', async (req, res) => {
  res.render('productos-test');
});

app.get('/chat', async (req, res) => {
  res.render('chat');
});


app.get("*", routes.failRoute);



// generar productos faker 
const generateFakeProducts = require('./utils/fakerProductGenerator');
const FakeP = generateFakeProducts(5);

const moment = require('moment');
const timestamp = moment().format('h:mm a');

const Contenedor = require('./container/contenedor');
const ContenedorMsg = require('./container/contenedorMsg');

const contenedorProductos = new Contenedor('productos');
const productosFS = contenedorProductos.getAll()
const dataMsg = new ContenedorMsg;



/* Normalizacion */

const { normalize, schema } = require('normalizr');


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

// Implementacion del server con socket
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(PORT, () => console.log("SERVER ON http://localhost:" + PORT));



/* Socket */

// Socket.io Corre cuando se conecta un cleinte
io.on("connection", async (socket) => {
  /* console.log(`Nuevo cliente conectado ${socket.id}`); */

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






