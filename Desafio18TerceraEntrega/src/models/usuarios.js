import { mongoose } from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  edad: { type: Number, required: true, max: 100 },
  telefono: { type: String, required: true, max: 100 },
  url: { type: String, required: true, max: 100 }
});

const Usuarios = mongoose.model("usuarios", UsuarioSchema);

export default Usuarios;
