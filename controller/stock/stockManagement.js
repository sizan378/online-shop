// external imports
const mongoose = require('mongoose')

// internal imports
const StockManagement = require('../../model/stock/stockManagementSchema')



async function createStock(req, res){
    try {
        let newStock
        newStock = new StockManagement({
            ...req.body,
        })
        await newStock.save()
        res.status(200).json({
            message: "New Stock created successfully"
        })
    } catch (error) {
        error = error.message,
        stack = error.stack
    }
}

async function allStockList(req, res) {
    try {
        const stock_list = await StockManagement.find()
        res.status(200).json(stock_list)
    } catch (error) {
        error = error.message,
        stack = error.stack
    }
}


async function singleStock(req, res) {
    try {
        stock_id = req.params.id
        if (mongoose.Types.ObjectId.isValid(stock_id)) {
            const stock_list = await StockManagement.find({ _id: stock_id })
            res.status(200).json(stock_list)
        }
        
    } catch (error) {
        error = error.message,
        stack = error.stack
    }
}


async function updateStock(req, res) {
    try {
        stock_id = req.params.id
        if (mongoose.Types.ObjectId.isValid(stock_id)) {
            await StockManagement.findByIdAndUpdate(stock_id, {...req.body})
            res.status(200).json({message: "Stock Update Successfully"});
        }
        
    } catch (error) {
        error = error.message,
        stack = error.stack
    }
}



module.exports = { createStock, allStockList, singleStock, updateStock }