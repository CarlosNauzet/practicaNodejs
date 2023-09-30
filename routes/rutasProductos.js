const express = require("express");
const Productos = require("../models/Product");

const router = express.Router();
router.get("/", async (req, res) => {
  const productos = await Productos.find();
  res.status(200).json(productos);
});

module.exports = router;
