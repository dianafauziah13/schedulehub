const express = require("express");
const router = express.Router();
const pimpinanjemaahController = require("../controllers/pimpinanJemaah");

router.use("/pimpinanjemaah", pimpinanjemaahController.addPJ);

module.exports = router;