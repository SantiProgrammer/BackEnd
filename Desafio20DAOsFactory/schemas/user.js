import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  nombre: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
  edad: { type: Number, required: true, max: 100 },
  telefono: { type: String, required: true, max: 100 },
  url: {
    type: String,
    default: "https://www.seekpng.com/png/full/329-3291908_here-are-your-avatars-for-this-school-year.png"
  }
});

export const User = mongoose.model("usuarios", UserSchema);


