// external imports
const mongoose = require('mongoose')


// internal imports
const Brand = require('../../model/brand/brandSchema')

async function createBrand(req, res){
    try {
        let newBrand
        newBrand = new Brand({
            ...req.body,
        })
        await newBrand.save()
        res.status(200).json({
            message: 'Brand saved successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}


async function brandList(req, res) {
    try {
        brand_list = await Brand.find()
        res.status(200).json(brand_list)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

async function singleBrand(req, res) {
    try {
        brand_id = req.params.id
        if (mongoose.Types.ObjectId.isValid(brand_id)){
            single_brand = await Brand.findById({ _id: brand_id })
            res.status(200).json(single_brand)
        }
        
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}


async function updateBrand(req, res){
    try {
        brand_id = req.params.id
        if (mongoose.Types.ObjectId.isValid(brand_id)){
            await Brand.findByIdAndUpdate(brand_id, {...req.body})
            res.status(200).json({
                message: 'Updated category successfully'
            })
        }
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}


module.exports = { createBrand, brandList, singleBrand, updateBrand }