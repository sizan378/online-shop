// external imports
const mongoose = require('mongoose');

// internal imports
const PaymentHistory = require('../../model/paymentHistory/paymentHistorySchema')



async function createPaymentHistory(req, res)  {
    try {
        let newPaymentHistory
        newPaymentHistory = new PaymentHistory({
            ...req.body,
        })
        await newPaymentHistory.save()
        res.status(200).json({
            message: 'paymentHistory created successfully'
            })
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

async function paymentHistoryList(req, res)  {
    try {
        let newPaymentHistory
        newPaymentHistory = await PaymentHistory.find()
        res.status(200).json(newPaymentHistory)
    } catch (error) {
        res.status(error.status || 500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

module.exports = { createPaymentHistory, paymentHistoryList }