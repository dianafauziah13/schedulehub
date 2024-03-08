const scopeDakwah = require('../models/scopedakwah');

// Menambahkan data pimpinan jemaah
const AddscopeDakwah = async (req, res) => {
    const scope = req.body;
    try{
        const newScope = await scopeDakwah.create(scope);
        res.status(201).json(newScope);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};


module.exports = {
    AddscopeDakwah
};