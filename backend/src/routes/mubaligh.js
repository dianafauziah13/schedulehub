const express = require('express');
const router = express.Router();
const MubalighController = require('../controllers/mubaligh');

// Menambahkan pimpinan jemaah baru
router.post('/add', MubalighController.addMubaligh);

module.exports = router;
