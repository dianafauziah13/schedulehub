const PimpinanJemaah = require('../models/pimpinanJemaah');

// Menambahkan data pimpinan jemaah
const addPJ = async (req, res) => {
    const { mosqueName, address, scopeDakwah} = req.body;
    try{
        const newPJ = await PimpinanJemaah.create({mosqueName, address, scopeDakwah});
        res.status(201).json(newPJ);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

// Menampilkan semua data pimpinan jemaah
const getAllPJ = async (req, res) => {
    try{
        const PJ = await PimpinanJemaah.find();
        res.status(201).json(PJ);
    }catch (err){
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Menghapus data pimpinan jemaah berdasarkan ID Pimpinan Jemaah
const deletePJByID = async (req, res) => {
    try{
        const pjID = req.params.id;
        const PJ = await PimpinanJemaah.findById(pjID);

        if (!PJ){
            return res.status(404).json({message: "Pimpinan Jemaah Not Found"});
        }
        await PimpinanJemaah.findByIdAndDelete(pjID);
        res.status(200).json({message: "Pimpinan Jemaah Deleted Successfully"});
    }catch(err){
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    addPJ,
    getAllPJ,
    deletePJByID,
};