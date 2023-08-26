//  external imports
const express = require('express');
const router = express.Router();


// internal imports
const tokenValidation = require('../../utils/tokenValidate');
const { productValidation, productValidationHandler } = require('../../middleware/product/productValidator')
const {createProduct, updateProduct, singleProduct} = require('../../controller/product/product')

router.use(tokenValidation)
router.post('/', productValidation, productValidationHandler, createProduct)
router.route('/:id').put(updateProduct).get(singleProduct)


module.exports = router