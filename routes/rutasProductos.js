const express = require("express");
const Productos = require("../models/Product");
const controladorProductos = require("../controllers/controladorProductos");
const authMiddleware = require("../middleware/jwtMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// router.use(authMiddleware); PARA TODAS LAS RUTAS

// router todos los productos

router.get("/", authMiddleware, controladorProductos.todosLosProductos);

// router crear productos
router.post(
  "/",
  // authMiddleware,
  upload.single("foto"),

  controladorProductos.crearProductos
);

// router para los tags
router.get("/tags", controladorProductos.tagsUnicos);

// router para borrar productos
router.delete("/:id", authMiddleware, controladorProductos.borrarProductos);

// router para actualizar los productos
//

module.exports = router;
