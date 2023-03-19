import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true, max: 10000 },
    descripcion: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    stock: { type: Number, required: false, default: 10 }
});

export const Product = mongoose.model("productos", productSchema);
