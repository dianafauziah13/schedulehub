const mongoose = require("mongoose");

const penugasanSchema = new mongoose.Schema({
    idpimpinanJemaah: {type: mongoose.Schema.Types.ObjectId, ref: 'PimpinanJemaah'},
    TimeAssigned:{
        type: Date,
        default: Date.now
    },
    Mubaligh:[{type: mongoose.Schema.Types.ObjectId, ref: 'mubaligh'}],

});

const  penugasan= mongoose.model('penugasan', penugasanSchema);

module.exports = penugasan;