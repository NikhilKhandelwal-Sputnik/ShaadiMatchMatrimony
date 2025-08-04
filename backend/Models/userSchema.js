const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email:{ 
        type:String,
        require:true,
    },
    phoneNo:{
        type:String,
        length:10,
    },
    password:{
        type:String,
        require:true
    },
    privacy:{
        type:Number,
        length:1,
        required:true
    },

},{timestamps:true}, {collection:'users'});

module.exports = mongoose.model("User", userSchema)