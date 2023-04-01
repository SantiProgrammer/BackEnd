import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import passport from "passport";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { passportInit } from "./middleware/passportAuth.js";
import {
  authRouter,
  chatRouter,
  defaultRouter,
  productRouter,
  userRouter
} from "./routers/router.js";
import { client, redisConnect, RedisStoreSession } from "./utils/redis.js";
import logger from "./utils/winston.js";
dotenv.config();
const app = express();

const server = http.createServer(app)
const io = new Server(server);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

passportInit();
redisConnect();
startSockets()

export class mainServer {
  constructor() {
    this.PORT = process.env.PORT || 8888;
    this.app = express();
    this.httpServer = new HttpServer(this.app);
    // this.ioServer = new this.ioServer(this.httpServer);
    this.middlewares();
    this.routes();
    this.templatingEngine();
    this.startSockets();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        store: new RedisStoreSession({
          host: "localhost",
          port: 6379,
          client,
          ttl: 300,
        }),
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

    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  routes() {
    this.app.use("/", defaultRouter);
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/user", userRouter);
    this.app.use("/api/product", productRouter);
    this.app.use("/api/chat", chatRouter);
  }

  startSockets() {
    io.on('connection', (socket) => {

      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

  }

  templatingEngine() {
    this.app.use("/public", express.static(__dirname + "/public"));
    this.app.set("view engine", "hbs");
    this.app.set("views", "./views");
    this.app.engine(
      "hbs",
      engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
      })
    );

  }

  listen() {
    server.listen(this.PORT, () =>
      logger.log("info", `✅ Server ON at => http://localhost:${this.PORT}`)
    );
  }
}



