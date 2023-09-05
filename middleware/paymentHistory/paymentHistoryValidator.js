// internal imports
const { body, validationResult } = require('express-validator')


const paymentHistoryValidator = [
    body("tranx_id")
        .isLength({min:1})
        .withMessage("tranx_id cannot be empty")
        .trim(),

    body("amount")
        .isNumeric
        .withMessage("amount only be a decimal number")
        .trim(),
]


const paymentHistoryValidation = function(req, res, next) {
    const error = validationResult(req)
    const mappedError = error.mapped()

    if (Object.keys(mappedError).length === 0) {
        next()
    } else {
        res.status(500).json({
            error: mappedError
        })
    }
}

module.exports = { paymentHistoryValidator, paymentHistoryValidation }