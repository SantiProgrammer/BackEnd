const express = require("express");
const session = require("express-session");
const app = express();
const wLogger = require("./services/winston")
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuarios = require("./models/usuarios");
const bcrypt = require("bcrypt");
const routes = require("./routes/routes");
const routesChat = require("./routes/routesChat");
const routesNginx = require("./routes/routesNginx");
const mongoConect = require("./services/mongo");
mongoConect();
const { engine } = require('express-handlebars');
const redis = require("redis");
const generateFakeProducts = require('./utils/fakerProductGenerator');
const moment = require('moment');

const containerFileSystem = require('./container/containerFileSystem');
const containerFSProductos = new containerFileSystem('productos');
const containerFSMensajes = new containerFileSystem('mensajes');
const productosFS = containerFSProductos.getAll()

const timestamp = moment().format('h:mm a');
const FakeP = generateFakeProducts(5);
const compression = require('compression')

const PORT = parseInt(process.argv[2]) || 8080;
httpServer.listen(PORT, () => wLogger.log('info', "SERVER ON http://localhost:" + PORT));

const client = redis.createClient({ legacyMode: true, });
client
  .connect()
  .then(() => wLogger.log('info', "Connected to REDIS ✅"))
  .catch((e) => {
    throw wLogger.log('error', `Can not connect to Redis! ❌ ${e}`);
  });
const RedisStore = require("connect-redis")(session);


/* Middlewares */
app.use(compression());
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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), routes.postLogin);
app.post("/signup", passport.authenticate("signup", { failureRedirect: "/failsignup" }), routes.postSignup);

app.get("/", routes.getRoot);
app.get("/login", routes.getLogin);
app.get("/faillogin", routes.getFaillogin);
app.get("/signup", routes.getSignup);
app.get("/failsignup", routes.getFailsignup);
app.get("/logout", routes.getLogout);
app.get('/chat', routesChat.GetChat);
app.get('/info', (req, res) => {
  console.log('Atillery test')
  res.render('info')
});

app.get('/nginx', routesNginx.getNginx);
app.get('/api/randoms', routesNginx.getApiRandoms);
app.get("/form", checkAuthentication, (req, res) => { res.render('form', { layout: 'logged' }); });
app.get('/products-list', async (req, res) => { res.render('products-list'); });
app.get('/productos-test', async (req, res) => { res.render('productos-test'); });
app.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { username, password } = req.user;
  const user = { username, password };
  const admin = JSON.stringify(req.session.admin);
  res.render("private", { layout: 'logged', user, admin })
});
app.get("/showsession", (req, res) => {
  const mySession = JSON.stringify(req.session, null, 4)
  req.session.touch()
  //res.json(req.session)
  res.render('session', { layout: 'logged', session: mySession })
});
app.get("*", routes.failRoute);

/* Passport */
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}
function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Usuarios.findById(id, done);
});

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Usuarios.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        wLogger.log('warn', `User Not Found with username ${username}`)
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        wLogger.log('warn', `Invalid Password`)
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
          wLogger.log('warn', "❌ Error in SignUp: " + err);
          return done(err);
        }

        if (user) {
          wLogger.log('warn', "User already exists");
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };
        Usuarios.create(newUser, (err, userWithId) => {
          if (err) {
            wLogger.log('warn', "❌ Error in Saving user: " + err);
            return done(err);
          }
          wLogger.log(user);
          wLogger.log('warn', "User Registration succesful ✅");
          return done(null, userWithId);
        });
      });
    }
  )
);


/* Normalizacion */
const { normalize, schema } = require('normalizr');
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
  const messages = await containerFSMensajes.getAll();
  const normalizedMessages = normalizarData(messages);
  return normalizedMessages;

}

/* Socket */
io.on("connection", async (socket) => {
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
});