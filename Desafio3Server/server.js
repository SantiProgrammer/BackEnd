const express = require('express');
const Contenedor = require("./contenedor");
const app = express();
const PORT = process.env.PORT || 8080;

const productoContainer = new Contenedor("productos")

const randomFunction = (limite) => {
    return parseInt(Math.random() * limite)
}

app.get('/', (req, res) => {
    res.send("<h1 style='color:black'>Bienvenidos al servidor express</h1> <a href='/productos'>productos</a> <a href='/productoRandom'>producto ramdom</a>")
})


app.get("/productos", (req, res) => {
    productoContainer.getAll()
        .then(listaParse => {
            res.json(listaParse)
        })

})


app.get("/productoRandom", (req, res) => {
    productoContainer.getAll()
        .then(listaParse =>
            listaParse[randomFunction(listaParse.length)]
        )
        .then(itemLista =>
            res.json(itemLista))
});


app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
})