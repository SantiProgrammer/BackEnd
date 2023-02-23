import fs from "fs";
import wLogger from "../utils/winston.js"

class ContainerFileSystem {
    constructor(fileName) {
        this.filePath = `./src/api/${fileName}.json`;
    }

    getAll = async () => {
        try {
            const archivo = await fs.promises.readFile(this.filePath);
            const productos = JSON.parse(archivo);
            return productos;
        } catch (error) {
            throw wLogger.log('error', `Ocurrio un error: ${error}`);
        }
    };

    syncGetAll = () => {
        try {
            const archivo = fs.readFileSync(this.filePath);
            const productos = JSON.parse(archivo);
            return productos;
        } catch (error) {
            throw wLogger.log('error', `Ocurrio un error: ${error}`);
        }
    };

    save = async (producto) => {
        try {
            const productos = await this.getAll();
            const id = productos.length === 0 ? 1 : productos[productos.length - 1].id + 1;
            producto.id = id;
            productos.push(producto);
            await fs.promises.writeFile(this.filePath, JSON.stringify(productos, null, 3));
        } catch (error) {
            throw wLogger.log('error', `Ocurrio un error: ${error}`);
        }
    };

    getById = async (id) => {
        try {
            const productos = await this.getAll();
            const productoEncontrado = productos.find((producto) => producto.id == id);
            if (!productoEncontrado) return wLogger.log('warn', "El id del pruducto no existe");
            return productoEncontrado;
        } catch (error) {
            throw wLogger.log('error', `Ocurrio un error: ${error}`);
        }
    };


    deleteById = async (id) => {
        try {
            const productos = await this.getAll();
            const productoEncontrado = productos.find((producto) => producto.id == id);
            if (!productoEncontrado) return wLogger.log('warn', "El id del pruducto no existe");
            const productosFiltrados = productos.filter((producto) => producto.id != id);
            await fs.promises.writeFile(this.filePath, JSON.stringify(productosFiltrados, null, 3));
        } catch (error) {
            throw wLogger.log('error', `Ocurrio un error: ${error}`);
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
                await fs.promises.writeFile(this.filePath, JSON.stringify(productos, null, 2))
                return item
            } else {
                return { error: 'Product not found' }
            }
        } catch (error) {
            throw wLogger.log('error', `Ocurrio un error: ${error}`);
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));
        } catch (error) {
            throw wLogger.log('error', `Ocurrio un error: ${error}`);
        }
    }

}

export default ContainerFileSystem;




