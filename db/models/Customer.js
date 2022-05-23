const mongoose =require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name:String,
    contact:String
});

module.exports = mongoose.model('Cutomer',CustomerSchema)