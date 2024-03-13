const mongoose = require("mongoose");

const pimpinanjemaahSchema = new mongoose.Schema({
    KetuaPJ: {type: mongoose.Schema.Types.ObjectId, ref: 'mubaligh'},
    mosqueName:{
        type: String,
    },
<<<<<<< HEAD
    topicOfKajian:{
        type: String,
    },
=======
>>>>>>> 9ba05b11b00e68e8194d5906e65254efcdba310f
    scopeDakwahJumat:[
        {
            Minggu_ke: {type:Number},
            scopeDakwah: {type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah'},
        }
    ],
    ScopeDakwahPengajian:[
        {
            hari: {type:String},
	        detailWaktu: {type:String},
	        TopicOfKajian : {type:String}
        }
    ]

});

const  PimpinanJemaah= mongoose.model('PimpinanJemaah', pimpinanjemaahSchema);

module.exports = PimpinanJemaah;