// external imports
const { body, validationResult } = require('express-validator');

// internal imports
const User = require('../../model/user/userSchema')

const userValidation = [
    body("firstName")
        .isLength({ min:1})
        .withMessage("First name should not be empty")
        .isAlpha("en-US", {ignore:"-"})
        .withMessage("Name must be anything without alphabet")
        .toLowerCase()
        .trim(),

    body("lastName")
        .isLength({ min:1})
        .withMessage("Last name should not be empty")
        .isAlpha("en-US", {ignore:"-"})
        .withMessage("Name must be anything without alphabet")
        .toLowerCase()
        .trim(),

    body("email")
        .isEmail()
        .withMessage("Email is required")
        .toLowerCase()
        .trim()
        .custom(async(value)=>{
            try{
                const user = await User.findOne({ email: value })
                if (user) {
                    throw new Error("Email is already used")
                }
            } catch(error){
                throw new Error(error.message)
            }
        }),

    body("phoneNumber")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be valid bangladeshi number")
        .custom(async(value)=>{
            try {
                const user = await User.findOne({phoneNumber: value})
                if (user) {
                    throw new Error("Mobile number is already in use")
                }
            } catch (error) {
                throw new Error(error.message)
            }
        }),
    body("password")
    .isLength({ min:1})
    .withMessage("password should not be empty")
]


const validationHandler = function(req, res, next) {
    const error = validationResult(req)
    const mappedError = error.mapped()
    console.log(mappedError)

    if (Object.keys(mappedError).length === 0) {
        next()
    } else {
        res.status(500).json({
            message: mappedError
        })
    }
}

module.exports = { userValidation, validationHandler }