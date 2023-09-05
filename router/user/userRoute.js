// external imports
const express = require('express')
const router = express.Router();

// internal imports
const { userValidation, validationHandler } = require('../../middleware/user/userValidator')
const { userRegistrations, userLogin, userPasswordChange } = require('../../controller/user/user_auth/userAuth')
const userInfoUpdate = require('../../controller/user/user_operation/userInfoUpdate')
const userDetails = require('../../controller/user/user_operation/userDetails')
const tokenValidation = require('../../utils/tokenValidate');
const refreshToken = require('../../utils/refreshToken');
const { userBalanceList, userBalance, userBalanceCreate } = require('../../controller/user/user_operation/userBalance')
const { createPaymentHistory, paymentHistoryList } = require('../../controller/paymentHistory/paymentHistory')
const balanceCashIn = require('../../utils/sslcommerz/sslcommerzSetup')


router.post('/register', userValidation, validationHandler, userRegistrations)
router.post('/login', userLogin)
router.get('/refresh-token', refreshToken)
router.use(tokenValidation)

router.put('/user-update/:id', userInfoUpdate)
router.put('/change-password/:id', userPasswordChange)
router.get('/details/:id', userDetails)

// user balance
router.post('/cash-in/', balanceCashIn, userBalanceCreate)
router.get('/check-balance/:id', userBalance)


// admin can see all user balance
router.get('/user-balance/', userBalanceList)
router.get('/payment-history-list/', paymentHistoryList)






router.get('/', (req, res) =>{
    res.status(403).json({
        message: "successfully login verification"
    })
})

module.exports = router