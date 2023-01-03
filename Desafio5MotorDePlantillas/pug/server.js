const express = require('express');
const app = express();
const PORT = 8082;

const Contenedor = require('./container/contenedor');

const data = new Contenedor;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));


app.set('view engine', 'pug');
app.set('views', './views');

app.get('/hello', (req, res) => {
  res.render('hello.pug', { msg: 'un msg del perrito', x: 100 });
});

app.get('/', async (req, res) => {
  const products = await data.getAll()
  res.render('products.pug', { products, productsExist: true });
});

app.get('/form', (req, res) => {
  res.render('form.pug', { msg: 'un msg del perrito', x: 100 });
});

app.post('/', async (req, res) => {
  const { body } = req;
  try {
    data.save(body);
    res.render('gracias.pug')
  } catch {
    res.json({ error: true, msj: "No se pudo guardar el producto" });
  }
});