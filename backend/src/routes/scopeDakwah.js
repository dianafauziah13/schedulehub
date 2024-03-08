const express = require('express');
const router = express.Router();
const scopeDakwahController = require('../controllers/scopeDakwah');

// Menambahkan pimpinan jemaah baru
router.post('/add', scopeDakwahController.AddscopeDakwah);

module.exports = router;
