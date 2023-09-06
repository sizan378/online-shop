// internal imports
const { body, validationResult } = require('express-validator')


const purchaseHistoryValidator = [
    body("price")
        .isInt({min:1})
        .withMessage("price cannot be less than 1"),

    body("quantity")
        .isInt({min:1})
        .withMessage("quantity cannot be less than 1 "),
]

const purchaseHistoryValidation = (req, res, next) => {
    const error = validationResult(req)
    const mappedError = error.mapped()

    if (Object.keys(mappedError).length  === 0) {
        next()
    } else {
        res.status(500).json({
            error: mappedError
        })
    }
}


module.exports = { purchaseHistoryValidator, purchaseHistoryValidation }