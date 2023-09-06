// external imports
const mongoose = require('mongoose');


const purchaseHistorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    color: {
        type: String,
    }
},
{
    timestamps: true,
})


const PurchaseHistory = mongoose.model('PurchaseHistory', purchaseHistorySchema)

module.exports = PurchaseHistory