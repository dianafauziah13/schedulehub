const PimpinanJemaah = require('../models/pimpinanJemaah');

const addPJ = async (req, res) => {
    const { mosqueName, address, scopeDakwah} = req.body;
    try{
        const newPJ = await PimpinanJemaah.create({mosqueName, address, scopeDakwah});
        res.status(201).json(newPJ);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

module.exports = {
    addPJ,
};