const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

UserSchema.statics.hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};
UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compare(password, this.password);
};
const Usuario = mongoose.model("Usuario", UserSchema);

module.exports = Usuario;
