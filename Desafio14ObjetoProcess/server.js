import express from "express";
import routerCarrito from "./src/routes/routerCarritos.js";
import routerProductos from "./src/routes/routerProductos.js";
import routerDefault from "./src/routes/routerDefault.js";
import { engine } from "express-handlebars";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', './src/views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/src/views/layouts',
    partialsDir: __dirname + '/src/views/partials',
  })
);



app.listen(PORT, () =>
  console.log(`Se muestra en el puerto http://localhost:${PORT} `)
);

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);
app.get("/api/randoms", routerDefault);
app.get("/info", routerDefault);



app.get("*", (req, res) => {
  res.json({ error: true, descripcion: "ruta no encontrada" });
});



