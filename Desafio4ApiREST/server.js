const express = require("express");
const { Router } = express;
const multer = require("multer");
const app = express();
const routerProductos = Router();
const port = process.env.PORT || 8081;
const Contenedor = require("./container/contenedor");

const data = new Contenedor()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Servidor app escuchando en el puerto http://localhost:${port}`);
});


app.use('/api/productos', routerProductos);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});


app.get('/formulario', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname +
            '-' +
            Date.now() +
            '.' +
            file.originalname.split('.').pop()
        );
    },
});
const upload = multer({ storage: storage });


routerProductos.get("/", async (req, res) => {
    const productos = await data.getAll()
    if (productos) {
        res.send(productos)
    } else {
        return console.log();
    }
})


routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await data.getById(id);
    if (!product) {
        res.json({ error: true, msj: "id no encontrado" });
    } else {
        res.send({ success: true, product: product });
    }
});


routerProductos.post('/', upload.single('myFile'), async (req, res) => {
    const { body } = req;

    try {
        data.save(body);
        res.send({ success: true, msj: `Producto guardado exitosamente!` });
    } catch {
        res.json({ error: true, msj: "No se pudo guardar el producto" });
    }
});


routerProductos.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, thumbnail } = req.body;
        await data.updateById(id, nombre, precio, thumbnail);


    } catch (error) {
        res.json({ error: true, msj: "error" });
    }
});

routerProductos.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        data.deleteById(id);
        return res.json({ success: true, msj: "Producto borrado!" });

    } catch (error) {
        res.json({ error: true, msg: 'no se pudo borrar el producto' });
    }
});



