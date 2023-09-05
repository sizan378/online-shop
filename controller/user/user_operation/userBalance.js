// internal imports
const UserBalance = require('../../../model/user/userBalanceSchema')
const PaymentHistory = require('../../../model/paymentHistory/paymentHistorySchema')


async function userBalanceCreate(req, res){
    try {
        firstName = req.user.firstName
        lastName = req.user.lastName
        fullName = firstName.concat(" ", lastName);
        user = await UserBalance.findOne({user_id: req.user.id})
        if (!user){
            data = {
                user_id: req.user.id,
                phoneNumber: req.user.phoneNumber,
                email: req.user.email,
                fullName: fullName,
                balance: req.cash.total_amount
    
            }
    
            let userBalance
            userBalance =  UserBalance(data)
            await userBalance.save()
            
        } else {
            update_balance = user.balance + req.cash.total_amount
            balance_update = await UserBalance.findOneAndUpdate({user_id: req.user.id}, {balance: update_balance})
        }

        let paymentHistory
        data = {
            user_id: req.user.id,
            phoneNumber: req.user.phoneNumber,
            email: req.user.email,
            tranx_id: req.cash.tran_id,
            paymentMethod: "SSLCOMMERZ",
            amount: req.cash.total_amount
        }
        paymentHistory = new PaymentHistory(data)
        await paymentHistory.save()

        res.status(200).json({
            message: "amount added successfully"
        })
        
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

async function userBalanceList(req, res) {
    try {
        const user_list = await UserBalance.find()
        res.status(200).json(user_list)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}


async function userBalance(req, res) {
    try {
        user_id = req.user.id;
        const user_balance = await UserBalance.findById({_id: user_id});
        res.status(200).json(user_balance)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}


module.exports = { userBalanceList, userBalance, userBalanceCreate }