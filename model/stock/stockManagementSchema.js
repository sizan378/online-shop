const mongoose = require('mongoose');


const stockManagementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    },
    category: [String],
    color: [String],
    mrp: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    model: {
        type: String,
    }
},
{
    timestamps: true,
});

const StockManagement = mongoose.model('StockManagement', stockManagementSchema)
module.exports = StockManagement