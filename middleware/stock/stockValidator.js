// external imports
const { body, validationResult } = require('express-validator');



const stockManagementValidation = [
    body("name")
        .isLength({min:1})
        .withMessage("Name should not be empty")
        .trim(),
    
    body("sku")
        .isLength({min:1})
        .withMessage("SKU should not be empty")
        .trim(),
    
    body("mrp")
        .isNumeric()
        .withMessage("Only Decimals allowed")
        .trim(),
    
    body("quantity")
        .trim(),

]


const stockManagementValidate = function(req, res, next) {
    const error = validationResult(req)
    const mappedError = error.mapped()

    if (Object.keys(mappedError).length === 0) {
        next()
    } else {
        res.status(error.status || 500).json({
            error: mappedError
        })
    }
}


module.exports = { stockManagementValidation, stockManagementValidate }