const mongoose = require('mongoose');


const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},
{
    timestamps: true,
})

const Brand = mongoose.model("Brand", brandSchema)
module.exports = Brand