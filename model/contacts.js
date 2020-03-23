var mongoose = require("mongoose");
require('mongoose-type-email');
// var mongooseTypePhone = require('mongoose-type-phone');

var ContactSchema = new mongoose.Schema({
    name:String,
    email:{type: mongoose.SchemaTypes.Email , unique: true},
    phone:{type: String , unique: true}
});

module.exports = mongoose.model("Contact", ContactSchema);