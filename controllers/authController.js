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
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ email });
    if (!user)
      return res.status(404).json({
        msg: `Email o Password incorrectos`,
      });
    if (user.password !== password)
      return res.status(401).json({
        msg: `Email o Password incorrectos`,
      });
    res.status(200).json({
      msg: "usuario autenticado",
      user,
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
