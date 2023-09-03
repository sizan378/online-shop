// external imports

const express = require('express')
const router = express.Router()

// internal imports
const tokenValidation = require('../../utils/tokenValidate');
const { categoryValidations, validationHandler } = require('../../middleware/category/categoryValidator')
const { createCategory, categoryList, singleCategory, updateCategory } = require('../../controller/category/category')


router.use(tokenValidation)
router.route('/')
    .post(categoryValidations, validationHandler, createCategory)
    .get(categoryList)

router.route('/:id')
    .get(singleCategory)
    .put(categoryValidations, validationHandler, updateCategory)



module.exports = router