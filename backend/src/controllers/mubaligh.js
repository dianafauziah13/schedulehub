const Mubaligh = require('../models/mubaligh');

// Menambahkan data pimpinan jemaah
const addMubaligh = async (req, res) => {
    const mubaligh = req.body;
    try{
        const newMubaligh = await Mubaligh.create(mubaligh);
        res.status(201).json(newMubaligh);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};


module.exports = {
    addMubaligh
};