// external imports
const mongoose = require('mongoose');



const paymentHistorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    tranx_id: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    }
},
{
    timestamps: true,
})


const PaymentHistory = mongoose.model('PaymentHistory', paymentHistorySchema)
module.exports = PaymentHistory