const {body, validationResult } = require('express-validator')



const brandValidations = [
    body("name")
        .isLength({min:1})
        .withMessage("name cannot be empty")
        .toLowerCase()
        .trim(),
]


const validationHandler = (req, res, next) => {
    const error = validationResult(req)
    const mappedError = error.mapped()

    if (Object.keys(mappedError).length === 0 ){
        next()
    } else {
        res.status(500).json({
            message: mappedError
        })
    }
}

module.exports = { brandValidations, validationHandler }