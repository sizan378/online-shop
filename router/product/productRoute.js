//  external imports
const express = require('express');
const router = express.Router();


// internal imports
const tokenValidation = require('../../utils/tokenValidate');
const { productValidation, productValidationHandler } = require('../../middleware/product/productValidator')
const {createProduct, updateProduct, singleProduct, allProduct} = require('../../controller/product/product')
const { createComment, createReview } = require('../../controller/product/productReviewComment')
const ImageUpload = require('../../utils/imageUpload')

router.use(tokenValidation)
router.route('/')
    .post(ImageUpload, productValidation, productValidationHandler, createProduct)
    .get(allProduct)

router.route('/:id')
    .put(updateProduct)
    .get(singleProduct)

router.route('/comment/:id')
    .post(ImageUpload, createComment)

router.route('/review/:id')
    .post(createReview)


module.exports = router