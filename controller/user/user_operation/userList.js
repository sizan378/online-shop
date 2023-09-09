
// internal imports
const User = require('../../../model/user/userSchema')


async function userList(req, res){
    const user = await User.find()
    res.status(200).json(user)
}

module.exports = userList