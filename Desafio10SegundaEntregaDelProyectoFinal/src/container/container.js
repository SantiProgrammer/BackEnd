const fs = require("fs");

module.exports = class Container {
    constructor(name) {
        this.filePath = `./src/db/${name}.json`;
    }

    getAll = async () => {
        try {
            const archivo = await fs.promises.readFile(this.filePath);
            const productos = JSON.parse(archivo);
            console.log(`Se obtuvo el listado completo de productos`);

            return productos;
        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);

        }
    };


    save = async (producto) => {
        try {
            const productos = await this.getAll();

            const id = productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;

            producto.id = id;

            productos.push(producto);

            await fs.promises.writeFile(this.filePath, JSON.stringify(productos, null, 3));

            console.log(`Se salvo el objeto con el id ${id}`);

        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }

    };

    getById = async (id) => {
        try {
            const productos = await this.getAll();
            const productoEncontrado = productos.find((producto) => producto.id == id);

            if (!productoEncontrado) return console.log('El id del pruducto no existe');
            console.log(`Producto encontrado con el id ${id}: ${JSON.stringify(productoEncontrado)}`)
            return productoEncontrado;

        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }
    };


    deleteById = async (id) => {
        try {
            const productos = await this.getAll();
            const productoEncontrado = productos.find((producto) => producto.id == id);

            if (!productoEncontrado) return console.log('El id del pruducto no existe');
            const productosFiltrados = productos.filter((producto) => producto.id != id);

            await fs.promises.writeFile(this.filePath, JSON.stringify(productosFiltrados, null, 3));

            console.log(`Producto con el id ${id}, borrado exitosamente!`);


        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }
    }

    /*     update(element) {
            try {
                let one = this.elements.find((el) => el.id == element.id);
                // console.log(one)
                let newElement = { ...one, ...element };
     
                let index = this.elements.findIndex((el, ind) => {
                    if (el.id == newElement.id) {
                        return true;
                    }
                });
                this.elements[index] = newElement;
     
                fs.promises
                    .writeFile(this.name, JSON.stringify(this.elements, null, "\t"))
                    .then(() => console.log("Actualizado"))
                    .catch((e) => console.log(e));
     
                return { response: "Actualizado", element: newElement };
            } catch (error) {
                console.log(error);
                return { response: "Error!", error };
            }
        } */

    updateCartById = async (id, products, timestamp) => {
        try {
            const productos = await this.getAll();
            const isInProductList = productos.find(prod => Number(prod.id) == Number(id));
            const indexItem = productos.findIndex((prod) => Number(prod.id) == Number(id));
            if (isInProductList != undefined) {
                const objeto = { id: id, timestamp: timestamp, products: products };
                productos[indexItem] = objeto;
                console.log(objeto);
                fs.writeFileSync(this.filePath, JSON.stringify(productos, null, 2));
                return true;

            } else {
                return false;

            }

        } catch (error) {
            console.log(error);
        }
    }


    updateById = async (id, nombre, precio, thumbnail) => {

        try {
            const productos = await this.getAll();
            const item = productos.find((prod) => prod.id === Number(id))
            if (item) {
                item.nombre = nombre
                item.precio = precio
                item.thumbnail = thumbnail
                console.log(item);
                await fs.promises.writeFile(this.filePath, JSON.stringify(productos, null, 2))
                return item
            } else {
                return { error: 'Product not found' }
            }
        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }
    }

    async updateCartById(id, newData) {
        try {
            const elements = await this.getAll();

            const foundElementIndex = elements.findIndex(
                (element) => element.id == id
            );

            if (foundElementIndex === -1) return null;

            const foundElement = elements[foundElementIndex];


            for (const key in newData) {
                if (foundElement.hasOwnProperty(key)) {
                    foundElement[key] = newData[key];
                }
            }

            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify(elements, null, 3)
            );

            return foundElement;
        } catch (error) {
            console.log(error);
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
            console.log('Se ha borrado todo el array de productos exitosamente!');
        } catch (error) {
            console.log(`Ocurrio un error: ${error}`);
        }

    }
}





/* const container = new Container(); */

//console.log(contenedor.updateById(1));
// console.log(contenedor.getAll());
// console.log(contenedor.save({ title: 'producto 4', thumbnail: "ruta", price: 400 }))
// console.log(contenedor.getById(2));
// console.log(contenedor.deleteById(2));
// console.log(contenedor.deleteAll());

/* 
module.exports = Container; */




