var express = require("express");
var router = express.Router();
const Productos = require("../models/Product");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const productos = await Productos.find();
  console.log(productos);
  res.render("index", { title: "Express", productos });
});

module.exports = router;
