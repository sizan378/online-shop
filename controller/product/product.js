// internal imports
const Product = require('../../model/product/productSchema')



const createProduct = (req, res, next) => {
    try {
        console.log("request_body",req.body)
        let newProduct
        newProduct = new Product({
            ...req.body,
        })
        // newProduct.save()
        res.status(200).json({
            message: 'Product created successfully'
            })
    } catch (error) {
        res.status(error.status).json({
            error: error.message,
            MediaStreamTrack
        })
    }
}


module.exports = createProduct