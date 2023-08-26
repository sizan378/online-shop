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


router.post('/register', userValidation, validationHandler, userRegistrations)
router.post('/login', userLogin)

router.use(tokenValidation)
router.get('/refresh-token', refreshToken)
router.put('/user-update/:id', userInfoUpdate)
router.put('/change-password/:id', userPasswordChange)
router.get('/:id', userDetails)




router.get('/', (req, res) =>{
    res.status(403).json({
        message: "successfully login verification"
    })
})

module.exports = router