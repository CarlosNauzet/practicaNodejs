const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El campo email es obligatorio"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const Usuario = mongoose.model("Usuario", UserSchema);

module.exports = Usuario;
