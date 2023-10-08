var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const params = req.query;
  console.log(params["nombre"]); // = pepe
  const urlBase = "http://127.0.0.1:3000/api/v1/productos";
  const urlFinal = new URL(urlBase);
  Object.keys(params).forEach((key) => {
    urlFinal.searchParams.append(key, params[key]); // urlFinal.searchParams.append(name, params[name]) = pepe
  });
  console.log(urlFinal.toString());
  const { data } = await axios.get(urlFinal.toString());
  const productos = data;
  res.render("index", { title: "Express", productos });
});

module.exports = router;
