import mongoose from 'mongoose';

const productosSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true, max: 10000 },
    descripcion: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    stock: { type: Number, required: false, default: 10 }
});

const Productos = mongoose.model("productos", productosSchema);

export default Productos;