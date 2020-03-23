var mongoose = require("mongoose");
require('mongoose-type-email');
// var mongooseTypePhone = require('mongoose-type-phone');

var UserSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: mongoose.SchemaTypes.Email , unique: true},
    password: {type: String},
    address:{type: String},
    phone:{type: Number,unique:true},
    birth:{type: String},
    contacts:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Contact"
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);