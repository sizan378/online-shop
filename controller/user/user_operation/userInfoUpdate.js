
// internal imports
const User = require('../../../model/user/userSchema')

async function userInfoUpdate(req, res, next) {
    try {
        await User.findOneAndUpdate({_id: req.params.id}, {...req.body})
        res.status(200).json({
            message: "Information updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }
}

module.exports = userInfoUpdate