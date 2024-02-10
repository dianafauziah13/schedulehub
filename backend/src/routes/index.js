const express = require("express");
const router = express.Router();
// const pimpinanjemaahController = require("../controllers/pimpinanJemaah");

router.use("/pimpinanjemaah", require("./pimpinanJemaah"));

module.exports = router;