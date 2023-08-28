//  external imports
const express = require('express');
const router = express.Router();


// internal imports
const tokenValidation = require('../../utils/tokenValidate');
const { productValidation, productValidationHandler } = require('../../middleware/product/productValidator')
const imageUpload = require('../../middleware/product/imageUpload');
const {createProduct, updateProduct, singleProduct, allProduct} = require('../../controller/product/product')

router.use(tokenValidation)
router.route('/').post(imageUpload, productValidation, productValidationHandler, createProduct).get(allProduct)
router.route('/:id').put(updateProduct).get(singleProduct)


module.exports = router