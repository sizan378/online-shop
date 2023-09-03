// external imports
const mongoose = require('mongoose')


// internal imports
const Category = require('../../model/category/categorySchema')

async function createCategory(req, res){
    try {
        let newCategory
        newCategory = new Category({
            ...req.body,
        })
        await newCategory.save()
        res.status(200).json({
            message: 'Category saved successfully',
        })
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}


async function categoryList(req, res) {
    try {
        category_list = await Category.find()
        res.status(200).json(category_list)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

async function singleCategory(req, res) {
    try {
        category_id = req.params.id
        if (mongoose.Types.ObjectId.isValid(category_id)){
            single_category = await Category.findById({ _id: category_id })
            res.status(200).json(single_category)
        }
        
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}


async function updateCategory(req, res){
    try {
        category_id = req.params.id
        if (mongoose.Types.ObjectId.isValid(category_id)){
            await Category.findByIdAndUpdate(category_id, {...req.body})
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


module.exports = { createCategory, categoryList, singleCategory, updateCategory }