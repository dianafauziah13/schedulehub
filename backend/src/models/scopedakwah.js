const mongoose = require("mongoose");

const scopeSchema = new mongoose.Schema({
    LingkupDakwah:{
        type: String,
    }
});

const  scope= mongoose.model('ScopeDakwah', scopeSchema);

module.exports = scope;