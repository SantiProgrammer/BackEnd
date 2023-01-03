const express = require('express');
const app = express();
const PORT = 8081;
const { engine } = require('express-handlebars');
const Contenedor = require('./container/contenedor');

const data = new Contenedor;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
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
  const products = await data.getAll()
  res.render('productslist', { products, productsExist: true });
});

app.get('/form', (req, res) => {
  res.render('form');
});


app.post('/', async (req, res) => {
  const { body } = req;
  try {
    data.save(body);
    res.render('gracias.hbs')
  } catch {
    res.json({ error: true, msj: "No se pudo guardar el producto" });
  }
});