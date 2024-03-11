const mongoose = require("mongoose");

const pimpinanjemaahSchema = new mongoose.Schema({
    KetuaPJ: {type: mongoose.Schema.Types.ObjectId, ref: 'mubaligh'},
    mosqueName:{
        type: String,
    },
    topicOfKajian:{
        type: String,
    },
    scopeDakwahJumat:[
        {
            Minggu_ke: {type:Number},
            scopeDakwah: {type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah'},
        }
    ]
});

const  PimpinanJemaah= mongoose.model('PimpinanJemaah', pimpinanjemaahSchema);

module.exports = PimpinanJemaah;