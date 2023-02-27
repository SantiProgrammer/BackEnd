import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import session from "express-session";
const app = express();
import compression from "compression";
import wLogger from "./utils/winston.js";
import http from "http";
const httpServer = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(httpServer);
import passport from "passport";
import { passportInit, checkAuthentication } from './middleware/passportAuth.js';
import { Strategy as LocalStrategy } from "passport-local";
import Usuarios from "./models/usuarios.js";
import bcrypt from "bcrypt";
import routesAuth from "./routes/routesAuth.js";
import routesChat from "./routes/routesChat.js";
import routesNginx from "./routes/routesNginx.js";
import mongoConnect from "./services/mongo.js"
mongoConnect();
import { engine } from "express-handlebars";
import redis from "redis";
import generateFakeProducts from "./mocks/fakerProductGenerator.js";
import moment from "moment";
import containerFileSystem from "./container/containerFileSystem.js";
import sendEmail from "./utils/nodeMailer.js";


import instancia from './daos/index.js';
const producto = new instancia.producto;
const carrito = new instancia.carrito;

const containerFSProductos = new containerFileSystem('productos');
const containerFSMensajes = new containerFileSystem('mensajes');

const productosFS = containerFSProductos.getAll()
const productosMDB = producto.getAll()



import routerCarrito from "./routes/routerCarritos.js";
import routerProductos from "./routes/routerProductos.js";

const timestamp = moment().format('h:mm a');
const FakeP = generateFakeProducts(5);


const PORT = process.env.PORT || 8089;
httpServer.listen(PORT, () => wLogger.log("info", `Server on http://localhost:${PORT}`));


const client = redis.createClient({ legacyMode: true, });
client
  .connect()
  .then(() => wLogger.log('info', "✅ Connected to REDIS"))
  .catch((e) => {
    throw wLogger.log('error', `Can not connect to Redis! ❌ ${e}`);
  });



import RedisStore from 'connect-redis';

const RedisStoreSession = RedisStore(session);



/* Middlewares */
app.use(compression());
app.use(
  session({
    store: new RedisStoreSession({ host: "localhost", port: 6379, client, ttl: 300 }),
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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use('/public', express.static(__dirname + '/public'));

/* View engeine */
app.set('view engine', 'hbs');
app.set('views', './src/views');
app.engine('hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);
/* Endpoints */
passportInit();
app.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), routesAuth.postLogin);
app.post("/signup", passport.authenticate("signup", { failureRedirect: "/failsignup" }), routesAuth.postSignup);


app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.get("/", routesAuth.getRoot);
app.get("/login", routesAuth.getLogin);
app.get("/faillogin", routesAuth.getFaillogin);
app.get("/signup", routesAuth.getSignup);
app.get("/failsignup", routesAuth.getFailsignup);
app.get("/logout", routesAuth.getLogout);
app.get('/chat', routesChat.GetChat);
app.get('/carrito', (req, res) => { res.render('carrito', { layout: 'logged' }); });
app.get('/info', (req, res) => { res.render('info', { layout: 'logged' }); });

app.get('/nginx', routesNginx.getNginx);
app.get('/api/randoms', routesNginx.getApiRandoms);
app.get("/form", checkAuthentication, (req, res) => { res.render('form', { layout: 'logged' }); });
app.get('/products-list', checkAuthentication, async (req, res) => {
  try {

    res.render('products-list', { layout: 'logged' });
  } catch (e) {
    wLogger.log('error', 'products-list', e)
  }
});
app.get('/productos-test', async (req, res) => {
  try {
    res.render('productos-test', { layout: 'logged' });
  } catch (e) {
    wLogger.log('error', 'productos-test', e)
  }
});
app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password, edad, telefono, direccion, url, nombre } = req.user;
  const user = { username, password, edad, telefono, direccion, url, nombre };
  const admin = JSON.stringify(req.session.admin);
  res.render("private", { layout: 'logged', user, admin })
});
app.get("/showsession", (req, res) => {
  const mySession = JSON.stringify(req.session, null, 4)
  req.session.touch()
  //res.json(req.session)
  res.render('session', { layout: 'logged', session: mySession })
});
app.get("*", routesAuth.failRoute);






/* Normalizacion */
import { normalize, schema } from "normalizr";
const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'email' })
const messageSchema = new schema.Entity('messages', {
  author: authorSchema
})
const chatSchema = new schema.Entity("chats", {
  messages: [messageSchema]
})
const normalizarData = (data) => {
  const dataNormalizada = normalize({ id: "chatHistory", messages: data }, chatSchema);
  return dataNormalizada;
}
const normalizarMensajes = async () => {
  try {
    const messages = await containerFSMensajes.getAll();
    const normalizedMessages = normalizarData(messages);
    return normalizedMessages;

  } catch (e) {
    wLogger.log('error', 'error normalizarMensajes', e)
  }


}
const lista = await producto.getAll('productos');

const carrito1 = await carrito.getById('63f237469056899a969e2c51', 'carritos')




/* Socket */
io.on("connection", async (socket) => {
  try {

    socket.emit("products-list", lista);
    socket.emit("productos-test", FakeP)
    socket.emit("carrito-list", carrito1.productos)
    socket.emit("msg-list", await normalizarMensajes());
    socket.on("product", async (data) => {
      await containerFSProductos.save(data);
      io.sockets.emit("product-list", await productosFS);
    });

    socket.on("carritoUser", async (data) => {
      sendEmail("santi.iztli@gmail.com", JSON.stringify(data, null, 2));
    })

    socket.on("msg", async (data) => {
      await containerFSMensajes.save({ ...data, timestamp: timestamp });
      io.sockets.emit("msg-list", await normalizarMensajes());
    });

  } catch (e) {
    wLogger.log('error', 'error socket', e)
  }
});