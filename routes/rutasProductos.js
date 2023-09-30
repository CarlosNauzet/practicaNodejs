const express = require("express");
const Productos = require("../models/Product");
const todosLosProductos = require("../controllers/controladorProductos");

const router = express.Router();
router.get("/", todosLosProductos);

module.exports = router;
