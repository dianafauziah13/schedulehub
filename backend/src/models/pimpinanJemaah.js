const mongoose = require("mongoose");

const pimpinanjemaahSchema = new mongoose.Schema({
    mosqueName:{
        type: String,
    },
    address:{
        type: String,
    },
    scopeDakwah:{
        type: String,
    }

});

const  PimpinanJemaah= mongoose.model('PimpinanJemaah', pimpinanjemaahSchema);

module.exports = PimpinanJemaah;