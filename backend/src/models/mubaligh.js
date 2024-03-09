const mongoose = require("mongoose");

const mubalighSchema = new mongoose.Schema({
    Name:{
        type: String,
    },
    scopeDakwah:{
        type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah',
    },
    khutbahJumatAvailable:[{type: Number}],
    pengajianAvailable:[
        {
            minggu_ke:[{type:Number}],
            days:[{type: String}]
        }
    ],
    listOfKnowledge:[{type:String}]
});

const  mubaligh= mongoose.model('mubaligh', mubalighSchema);

module.exports = mubaligh;