var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Productos = require("./models/Product");
const _ = require("lodash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// connectas a la BBDD
const connectiondb = require("./database/connectdb");
connectiondb();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// crear nuestra primera ruta-test
app.get("/api/v1/test", (req, res) => {
  console.log(req);
  res.send("test-route");
});

// ruta para todos los productos
app.get("/api/v1/productos", async (req, res) => {
  const productos = await Productos.find();
  res.status(200).json(productos);
});

// ruta para crear un producto

app.post("/api/v1/productos", async (req, res) => {
  // console.log(req.body);
  const newProduct = await Productos.create(req.body);
  res.status(201).json({
    msg: "producto creado",
    newProduct,
  });
});

// ruta para lista los tags existentes

app.get("/api/v1/tags", async (req, res) => {
  const productos = await Productos.find();
  // const tags = productos.map((producto) => {
  //   return producto.tags;
  // });
  const tags = productos.flatMap((producto) => {
    return producto.tags;
  });
  const tagsUnicos = _.uniq(tags);
  res.status(200).json({
    msg: "tags únicos",
    tagsUnicos,
  });
});

// ruta para borrar un producto
app.delete("/api/v1/productos/:id", async (req, res) => {
  const id = req.params.id;
  const respuesta = await Productos.findByIdAndDelete(id);
  if (!respuesta) {
    res.status(404).json({
      msg: "No encontrado el producto a borrar",
    });
  } else {
    res.status(200).json({
      msg: "producto borrado con éxito",
      respuesta,
    });
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
