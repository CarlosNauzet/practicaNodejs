const Usuario = require("../models/User");
const signup = async (req, res) => {
  try {
    const newUser = await Usuario.create(req.body);
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
  res.json("login");
};

module.exports = {
  signup,
  login,
};
