const express = require("express");
const router = express.Router();
// const pimpinanjemaahController = require("../controllers/pimpinanJemaah");

router.use("/pimpinanjemaah", require("./pimpinanJemaah"));
router.use("/mubaligh", require("./mubaligh"));
router.use("/penugasan", require("./penugasan"));
router.use("/scopeDakwah", require("./scopeDakwah"));
module.exports = router;