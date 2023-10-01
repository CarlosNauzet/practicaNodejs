var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const Productos = require("./models/Product");

// router
const rutasProducto = require("./routes/rutasProductos");
const rutaTest = require("./routes/rutaTest");

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
app.use("/api/v1/test", rutaTest);

// ruta para todos los productos (cambiamos a USE porque el get/post está en el router (rutasProducto)
app.use("/api/v1/productos", rutasProducto);

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
