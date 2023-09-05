// external imports
const mongoose = require('mongoose');


const userBalanceSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    
},
{
    timestamps: true,
},)


const UserBalance = mongoose.model('UserBalance', userBalanceSchema)
module.exports = UserBalance