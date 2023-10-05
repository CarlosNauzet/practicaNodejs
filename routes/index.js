var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const { data } = await axios.get("http://127.0.0.1:3000/api/v1/productos");
  console.log(data);
  const productos = data;
  res.render("index", { title: "Express", productos });
});

module.exports = router;
