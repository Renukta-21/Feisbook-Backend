const { default: mongoose, model } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User