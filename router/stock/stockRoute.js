// external imports
const express = require('express')
const router = express.Router();

// internal imports
const tokenValidation = require('../../utils/tokenValidate')
const { stockManagementValidation, stockManagementValidate } = require('../../middleware/stock/stockValidator')
const { createStock, allStockList, singleStock, updateStock  } = require('../../controller/stock/stockManagement')


router.use(tokenValidation)
router.route('/')
    .post(stockManagementValidation, stockManagementValidate, createStock)
    .get(allStockList)

router.route('/:id')
    .put(stockManagementValidation, stockManagementValidate, updateStock)
    .get(singleStock)


module.exports = router