const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    sellingPrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    image: [{
        type: String,
    }],
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        rating: {
            type: Number,
        }
    }],
    comment: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        image: [{
            type: String,
        }],
        body:{
            type: String
        },
    }],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "brand",
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    }],
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "color",
    }

})

const Product = mongoose.model("Product", productSchema)
module.exports = Product