const express = require('express');
const router = express.Router();
const PJController = require('../controllers/pimpinanJemaah');

// Menambahkan pimpinan jemaah baru
router.post('/add', PJController.addPJ);
router.get('/', PJController.getAllPJ);
router.put('/update/:id', PJController.updatePJById);
router.delete('/delete/:id', PJController.deletePJByID);

module.exports = router;
