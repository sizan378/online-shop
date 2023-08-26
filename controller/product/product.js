// external imports
const mongoose = require('mongoose');

// internal imports
const Product = require('../../model/product/productSchema')



const createProduct = (req, res, next) => {
    try {
        console.log("request_body",req.body)
        let newProduct
        newProduct = new Product({
            ...req.body,
        })
        newProduct.save()
        res.status(200).json({
            message: 'Product created successfully'
            })
    } catch (error) {
        res.status(error.status).json({
            error: error.message,
            stack: error.stack
        })
    }
}

async function updateProduct(req, res, next) {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const product = await Product.findByIdAndUpdate({_id: req.params.id}, {...req.body});
            res.status(200).json({
                message: 'Product updated successfully',
            })
        }
    } catch (error) {
        res.status({
            error: error.message,
            stack: error.stack
        })
    }
}

async function singleProduct(req, res, next) {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const product = await Product.findById({_id: req.params.id});
            res.status(200).json(product)
        }
    } catch (error) {
        res.status({
            error: error.message,
            stack: error.stack
        })
    }
}

module.exports = {createProduct, updateProduct, singleProduct }