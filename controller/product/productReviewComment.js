// external imports
const { response } = require('express');
const mongoose = require('mongoose');

// internal imports
const Product = require('../../model/product/productSchema')

async function createComment(req, res) {
    const user_id = req.user.id
    const product_id = req.params.id

    if (mongoose.Types.ObjectId.isValid(product_id)) {
        const product = await Product.findById({_id: product_id})
        if (!product) {
            res.status(404).json({
                message: 'Product not found',
            })
        } else {
            try {
                const images = req.files.map(file => file.path)
                product.comment.push({
                    ...req.body,
                    user: user_id,
                    image: images,
                })
                await product.save()
                res.status(200).json({
                    message: 'product comment saved successfully'
                })
            } catch (error) {
                res.status(500).json({
                    error: error.message,
                    stack: error.stack
                })
            }
        }
    }
}


async function createReview(req, res) {
    const user_id = req.user.id;
    const product_id = req.params.id;
    const rating = req.body.rating;

    if (rating === undefined){
        res.status(400).json({message: 'Invalid rating'})
    } 
    if (rating > 5) {
        res.status(400).json({message: "rating can't be more than 5"})
    }

    if (mongoose.Types.ObjectId.isValid(product_id)) {
        const product = await Product.findById({_id: product_id});
        if (!product) {
            res.status(404).json({
                message: "product not found"
            });
        } else {
            product.reviews.push({
                rating: rating,
                user: user_id,
            })
            await product.save();
            res.status(200).json({
                message: "product review updated successfully"
            })
            
        }
    } else {
        res.status(403).json({message: "Invalid Product"})
    }
}



module.exports = { createComment, createReview}