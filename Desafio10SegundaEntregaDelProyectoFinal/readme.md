// Primera Entrega del Proyecto Final

// Este proyecto se prueba por PostMan! con el archivo /api test.postman_collection.json.

o con:

// Links para probar api/products

// Método Get / Devuelve un json con el array de productos -->

"http://localhost:8080/api/products/"

// Método Get / Devuelve el producto que le pases por /:id -->

"http://localhost:8080/api/products/1"

// Método Post / poste un producto en formato JSON -->

"http://localhost:8080/api/products/"

{
"timestamp": "19/11/2022, 13:43:56",
"nombre": "Nike balls",
"description": "",
"thumbnail": "../public/img/nike-shoes.jpg",
"precio": 8000,
"stock": "",
"id": 10
}

// Método Put / Edita un producto por su id /:id -->

"http://localhost:8080/api/products/1"

{
"timestamp": "19/11/2022, 13:43:56",
"nombre": "Nike balls",
"description": "",
"thumbnail": "../public/img/nike-shoes.jpg",
"precio": 8000,
"stock": "",
"id": 10
}

// Método Delete / borra un producto por su id /:id -->

"http://localhost:8080/api/products/4"

// Links para probar api/cart ---------->

// Método Post / Crea un nuevo carrito vacío con ID nuevo -->

http://localhost:8080/api/cart/

// Método Delete / borra todo el carrito con el /:id -->

http://localhost:8080/api/cart/2

// Método Get / Lista los productos guardados en el carrito con el /:id/products -->

http://localhost:8080/api/cart/1/products

// Método Post / Guarda los productos en el carrito por su id -->

http://localhost:8080/api/cart/1/products/4

// Método Delete / Elimina un producto del carrito por su id -->

http://localhost:8080/api/cart/1/products/4
