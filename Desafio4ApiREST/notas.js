const express = require('express');
const { Router } = express;
const multer = require('multer');
const app = express();
const routerUsuarios = Router();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

app.use('/api/usuarios', routerUsuarios);
app.use('/public', express.static(__dirname + '/public'));

let usuarios = [
    { id: 100, nombre: 'monica', edad: 20 },
    { id: 101, nombre: 'jorge', edad: 21 },
    { id: 102, nombre: 'raul', edad: 22 },
    { id: 103, nombre: 'juana', edad: 23 },
];
app.get('/', (req, res) => {
    res.send('<h1>HOLA NOSOTROS la 43495</h1>');
});

app.get('/formulario', (req, res) => {
    res.sendFile(__dirname + '/index.html');
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

app.post('/uploadfile', upload.single('myFile'), (req, res) => {
    const file = req.file;
    if (!file) {
        res.send({ error: true });
    } else {
        //res.send(file);
        res.send({ success: true });
    }
});

routerUsuarios.get('/', (req, res) => {
    const { query } = req;

    if (query?.nombre) {
        const usuariosFiltrado = usuarios.filter(
            (usuario) => usuario.nombre == query.nombre
        );

        return res.json(usuariosFiltrado);
    }

    res.json(usuarios);
});

routerUsuarios.post('/', (req, res) => {
    const { body } = req;
    usuarios.push(body);
    res.json('ok');
});

routerUsuarios.get('/:id', (req, res) => {
    const { id } = req.params;

    const usuarioEncontrado = usuarios.find((usuario) => usuario.id == id);
    if (usuarioEncontrado) {
        res.json({ success: true, user: usuarioEncontrado });
    } else {
        res.json({ error: true, msg: 'no encontrado' });
    }
});

routerUsuarios.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const indiceEncontrado = usuarios.findIndex((usuario) => usuario.id == id);
    if (indiceEncontrado >= 0) {
        usuarios[indiceEncontrado] = body;
        res.json({ success: true, user: body });
    } else {
        res.json({ error: true, msg: 'no encontrado' });
    }
});

routerUsuarios.delete('/:id', (req, res) => {
    const { id } = req.params;
    usuarios = usuarios.filter((usuario) => usuario.id != id);
    res.json({ success: true });
});
