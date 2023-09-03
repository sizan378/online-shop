// external imports
const express = require('express');
const router = express.Router();

// internal imports
const tokenValidation = require('../../utils/tokenValidate');
const { brandValidations, validationHandler } = require('../../middleware/brand/brandValidator')
const { createBrand, brandList, singleBrand, updateBrand } = require('../../controller/brand/brand')


router.use(tokenValidation)
router.route('/')
    .post(brandValidations, validationHandler, createBrand)
    .get(brandList)


router.route('/:id')
    .get(singleBrand)
    .put(brandValidations, validationHandler, updateBrand)


module.exports = router