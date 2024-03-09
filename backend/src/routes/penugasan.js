const express = require('express');
const router = express.Router();
const PenugasanController = require('../controllers/penugasan');

// Menambahkan pimpinan jemaah baru
router.post('/add', PenugasanController.addPenugasan);

module.exports = router;
