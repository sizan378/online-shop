// external imports
const mongoose = require('mongoose');

// internal imports
const PurchaseHistory = require('../../model/purchaseHistory/purchaseHistory')
const User = require('../../model/user/userSchema')
const Product = require('../../model/product/productSchema')
const UserBalance = require('../../model/user/userBalanceSchema')


async function productDetails (product_id) {
    if (mongoose.Types.ObjectId.isValid(product_id)) {
        const product = await Product.findOne({ _id: product_id })
        return product
    } else {
        return null;
    }
};

async function userBalanceCheck(user_id){
    const balance = await UserBalance.findOne({user_id: user_id})

    if (!balance) {
        return null;
    }
    return balance.balance
}

async function purchaseHistoryCreate(req, res){
    total_price = req.body.total_price
    product = req.body.product
    user_id = req.user.id

    // user balance check
    const balance = await userBalanceCheck(user_id)
    if (balance === null){
        res.status(400).json({
            message: "Please cash in your account"
        })
    }

    // balance deduct from account
    if (balance < total_price){
        res.status(400).json({
            message: "Insufficient balance"
        })
    }

    // user balance updated
    const updateBalance = balance - total_price
    await UserBalance.findOneAndUpdate({user_id: user_id}, {balance: updateBalance})

    for (let i = 0; i < product.length; i++) {
        const product_id = product[i].product_id

        // get product details of specific product
        const product_details = await productDetails(product_id);

        let newPurchase
        data = {
            user_id: user_id,
            product_id: product_id,
            price: product[i].price,
            quantity: product[i].quantity,
            category: product_details.category,
        }

        newPurchase = new PurchaseHistory(data)
        await newPurchase.save()
        res.status(200).json({
            message: 'Purchase history saved',
        })
    }
}

module.exports = purchaseHistoryCreate