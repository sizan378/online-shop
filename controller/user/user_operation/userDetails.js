var mongoose = require('mongoose');

// internal imports
const User = require('../../../model/user/userSchema')

async function userDetails(req, res, next) {
    try {
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
            const user = await User.findById({_id: req.params.id})
            res.status(200).json(user)
        } else {
            res.status(400).json({message: "Invalid params id"});
        }
        
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

module.exports = userDetails