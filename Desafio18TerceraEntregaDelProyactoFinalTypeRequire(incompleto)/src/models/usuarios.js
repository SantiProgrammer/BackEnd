const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  /*   nameuser: { type: String, required: true, max: 100 },
    phone: { type: Number, required: true, max: 13 },
    address: { type: String, required: true, max: 100 },
    address2: { type: String, required: true, max: 100 }, */
  age: { type: String, required: true, max: 100 },
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

const Usuarios = mongoose.model("usuarios", UsuarioSchema);
module.exports = Usuarios;
