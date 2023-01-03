const express = require('express');
const app = express();
const PORT = 8081;

const Contenedor = require('./container/contenedor');

const data = new Contenedor;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const products = await data.getAll()
  res.render('pages/products', { products });
});

app.post('/', async (req, res) => {
  const { body } = req;
  try {
    data.save(body);
    res.render('pages/gracias');
  } catch {
    res.json({ error: true, msj: "No se pudo guardar el producto" });
  }
});

/* app.post('/products', (req, res) => {
  const body = req.body;
  let id = 0;
  productsHC.forEach((item) => {
    if (item.id > id) id = item.id;
  });
  body.id = id + 1;
  productsHC.push(body);
  res.render('pages/gracias');
}); */

app.get('/form', (req, res) => {
  res.render('pages/form', { title: 'ingrese un producto nuevo' });
});
