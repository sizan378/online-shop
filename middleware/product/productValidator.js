//  external import
const {check, body, validationResult } = require('express-validator')

// internal import
const Product = require('../../model/product/productSchema')


const productValidation = [
    check("title")
        .isLength({ min: 1})
        .withMessage("title should not be empty")
        .trim(),

    check("sku")
        .isLength({ min: 1})
        .withMessage("sku should not be empty")
        .custom(async (value) =>{
            try {
                console.log(value);
                const product = await Product.findOne({ sku: value });
                if (product) {
                    throw new Error("sku code already exists")
                }
            } catch (error) {
                throw new Error({
                    error: error.message,
                    stack: error.stack
                })
            }
        }),

    check("productPrice")
        .isNumeric()
        .withMessage('Only Decimals allowed')
        .trim(),

    check("sellingPrice")
        .isNumeric()
        .withMessage('Only Decimals allowed')
        .trim(),

    check("description")
        .isLength({ min: 1})
        .withMessage("description should not be empty")
        .trim(),
        
    check("stock")
        .isNumeric()
        .withMessage('Only Decimals allowed')
        .trim(),
]


const productValidationHandler = function(req, res, next) {
    console.log("requested_product", req.body)
    const error = validationResult(req)
    const mappedError = error.mapped()
    console.log(mappedError)

    if (Object.keys(error.errors).length === 0) {
        next()
    } else {
        res.status(500).json({
            message: mappedError
        })
    }
}

module.exports = { productValidation, productValidationHandler }


