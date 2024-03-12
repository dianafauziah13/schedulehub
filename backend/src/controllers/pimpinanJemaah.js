const PimpinanJemaah = require('../models/pimpinanJemaah');

// Menambahkan data pimpinan jemaah
const addPJ = async (req, res) => {
    const pimpinanjemaah = req.body;
    try{
        const newPJ = await PimpinanJemaah.create(pimpinanjemaah);
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
};

// Memperbarui data pimpinan jemaah berdasarkan ID pimpinan Jemaah
const updatePJById = async (req, res) => {
    const PJID = req.params.id;
    const { mosqueName, address, scopeDakwah } = req.body;
  
    try {

      // Periksa apakah produk dengan ID yang diberikan ada dalam database
      const existingPJ = await PimpinanJemaah.findById(PJID);
      if (!existingPJ) {
        return res.status(404).json({ message: 'Pimpinan Jemaah not found' });
      }
      // Update pimpinan jemaah dengan data yang baru
      existingPJ.mosqueName = mosqueName;
      existingPJ.address = address;
      existingPJ.scopeDakwah = scopeDakwah;
      
      // Simpan perubahan ke database
      await existingPJ.save();
      res.status(200).json(existingPJ);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

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
};

module.exports = {
    addPJ,
    getAllPJ,
    updatePJById,
    deletePJByID,
};