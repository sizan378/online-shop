// external imports
const mongoose = require('mongoose')

// internal imports
const StockManagement = require('../../model/stock/stockManagementSchema')
const Product = require('../../model/product/productSchema')


async function productCreate(sku, request){
    try {
        const product = await Product.findOne({sku: sku});
        const colors = request.body.color
        if (!colors){
            colors = null;
        }

        if (!product){
            data = {
               title: request.body.name,
               sku: sku,
               productPrice: request.body.mrp,
               sellingPrice: 00,
               description: request.body.model,
               stock: request.body.quantity,
               category: request.body.category,
               color: colors,
               isActive: false,
            }

            let newProduct
            newProduct = new Product(data)
            await newProduct.save();
            return 200

        } else {
            total_stock = product.stock + Number(request.body.quantity)
            await Product.findOneAndUpdate({ stock : total_stock })
            return 200
        }
    } catch (error) {
        return {error: error.message, stack: error.stack}
    }
}

async function stockUpdate(sku, request){
    try {
        const stockCheck = await StockManagement.findOne({sku: sku})
        if (stockCheck){
            total_stock = stockCheck.quantity + Number(request.body.quantity)

            await StockManagement.findOneAndUpdate({sku: sku}, {quantity: total_stock})
            return 200
        } else {
            let newStock
            newStock = new StockManagement({
                ...request.body,
            })
            await newStock.save()

            return 200
        }
    } catch (error) {
        return {error: error.message, stack: error.stack}
    }
}


async function createStock(req, res){
    try {
        // stock create or update
        const stock = await stockUpdate(sku=req.body.sku, request=req)
        if (stock !== 200){
            res.status(500).json({
                message: error.error,
                stack: error.stack
            })
        }

        // product create or update
        const products = await productCreate(sku=req.body.sku, request=req)
        console.log("products_code", products)
        if (products !== 200){
            res.status(500).json({
                message: error.error,
                stack: error.stack
            })
        }
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