import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 100 },
    price: { type: Number, required: true, max: 10000 },
    description: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    stock: { type: Number, required: false, default: 10 }
});

export const Product = mongoose.model("productos", productSchema);
