//  external imports
const express = require('express');
const router = express.Router();


// internal imports
const tokenValidation = require('../../utils/tokenValidate');
const { productValidation, productValidationHandler } = require('../../middleware/product/productValidator')
const createProduct = require('../../controller/product/product')

router.use(tokenValidation)
router.post('/', createProduct)


module.exports = router