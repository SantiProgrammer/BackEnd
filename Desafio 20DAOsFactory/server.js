import compression from 'compression';

import dotenv from 'dotenv';
import express from 'express';
import { engine } from "express-handlebars";
import session from "express-session";
import http from "http";
import passport from "passport";
import path from 'path';
import { client, RedisStoreSession, redisConnect } from './utils/redis.js';
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import { passportInit } from './middleware/passportAuth.js';
import { authRouter, chatRouter, defaultRouter, productRouter, userRouter } from './routers/router.js';
import logger from "./utils/winston.js";
dotenv.config();
const app = express();

const HttpServer = http.createServer(app);
const io = new Server(HttpServer);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8089;
HttpServer.listen(PORT, () => logger.log("info", `✅ Server ON at => http://localhost:${PORT}`));

passportInit();
redisConnect();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
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
    saveUninitialized: false
}));
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine('hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', defaultRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/chat', chatRouter);
