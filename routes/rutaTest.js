const express = require("express");

const test = require("../controllers/controladorTest");

const router = express.Router();
router.get("/", test);

module.exports = router;
