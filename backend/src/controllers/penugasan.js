const Penugasan = require('../models/penugasan');

// Menambahkan data pimpinan jemaah
const addPenugasan = async (req, res) => {
    const penugasan = req.body;
    try{
        const newPenugasan = await Penugasan.create(penugasan);
        res.status(201).json(newPenugasan);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};


module.exports = {
    addPenugasan
};