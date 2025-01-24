const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        required: true,
        trim: true,
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        required: true,
        type: String
    },
    images: {
        profile: {
            url: String,
            public_id: String,
        },
        cover: {
            url: String,
            public_id: String
        }
    },
    bio: {
        type: String
    },
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    friendRequests: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.passwordHash;
        delete ret.__v;
        return ret;
    }
});

// Evita la redefinición del modelo

const User =  mongoose.model('User', userSchema);

module.exports = User;
