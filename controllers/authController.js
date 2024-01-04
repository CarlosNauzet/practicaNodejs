const Usuario = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const signup = async (req, res) => {
  try {
    const newUser = new Usuario(req.body);
    newUser.password = await Usuario.hashPassword(req.body.password);
    await newUser.save();
    res.status(201).json({
      msg: "usuario creado",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ email });
    if (!user)
      return res.status(404).json({
        msg: `Email o Password incorrectos`,
      });
    const isCorrectPassword = await user.comparePasswords(password);
    if (!isCorrectPassword)
      return res.status(401).json({
        msg: `Email o Password incorrectos`,
      });

    const tokenJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    res.status(200).json({
      msg: "usuario autenticado",
      tokenJwt,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};
