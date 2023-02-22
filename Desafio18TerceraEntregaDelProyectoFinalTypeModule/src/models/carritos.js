import { Schema, model } from 'mongoose';

const CarritosSchema = new Schema({
  timestamp: { type: String, required: true, max: 100 },
  productos: [{ type: Object }],
  });

export const ModeloCarritos = model('carritos', CarritosSchema);