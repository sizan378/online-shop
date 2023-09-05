// external imports
const SSLCommerzPayment = require('sslcommerz-lts')
const {v4 : uuidv4} = require('uuid')

// sslcommerz variables
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASSWORD
const is_live = false //true for live, false for sandbox

// tran_id generator
tran_id = uuidv4()

console.log("tran_id", tran_id)


const balanceCashIn = (req, res, next) => {
    const data = {
        total_amount: req.body.amount,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        // success_url: 'http://localhost:5002/success',
        // fail_url: 'http://localhost:5002/fail',
        // cancel_url: 'http://localhost:5002/cancel',
        // ipn_url: 'http://localhost:5002/ipn',
    };
    req.cash = data
    next()
    // console.log("data", data)
    
    // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    // sslcz.init(data).then(apiResponse => {
    //     // Redirect the user to payment gateway
    //     let GatewayPageURL = apiResponse.GatewayPageURL
    //     res.send({url: GatewayPageURL});
    //     console.log('Redirecting to: ', GatewayPageURL)
    // });
    // res.status(200).json(data);

}


module.exports = balanceCashIn