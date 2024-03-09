const mongoose = require("mongoose");

const pimpinanjemaahSchema = new mongoose.Schema({
    mosqueName:{
        type: String,
    },
    topicOfKajian:{
        type: String,
    },
    scopeDakwah:{
        type: mongoose.Schema.Types.ObjectId, ref: 'ScopeDakwah',
    }

});

const  PimpinanJemaah= mongoose.model('PimpinanJemaah', pimpinanjemaahSchema);

module.exports = PimpinanJemaah;