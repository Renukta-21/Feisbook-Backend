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
userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
    }
});


const User = mongoose.model('User', userSchema)



module.exports = User