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

const getAllPJ = async (req, res) => {
    try{
        const PJ = await PimpinanJemaah.find();
        res.status(201).json(PJ);
    }catch (err){
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addPJ,
    getAllPJ,
};