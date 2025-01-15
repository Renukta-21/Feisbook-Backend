const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    }, email:{
        type:String,
        required:true,
        unique:true
    },
    passwordHash:{
        required:true,
        type:String
    },
    profilePicture:{
        type:String,
    },
    coverPhoto:{
        type:String
    },
    bio:{
        type:String
    },
    friends:[{
        type: mongoose.Types.ObjectId,
        ref:'User'
    }]
})

const User = mongoose.model('User', userSchema)
module.exports = User