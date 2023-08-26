
// internal imports
const User = require('../../../model/user/userSchema')

async function userDetails(req, res, next) {
    try {
        const user = await User.findOne({_id: req.params.id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

module.exports = userDetails