const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'marketing', 'operation'],
        default: 'user',
    },
    refreshToken: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },

},
{
    timestamps: true,
},)

const User = mongoose.model('User', userSchema)

module.exports = User