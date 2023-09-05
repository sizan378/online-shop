// internal imports
const { body, validationResult } = require('express-validator')


const userBalanceValidator = [
    body("balance")
        .isNumeric()
        .withMessage("Only Decimals allowed")
        .trim(),
]


const userBalanceValidation = function(req, res, next) {
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

module.exports = { userBalanceValidator, userBalanceValidation }