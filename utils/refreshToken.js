// external imports
const jwt = require('jsonwebtoken');


// internal imports
const User = require('../model/user/userSchema')


async function accessToken(req, res, next) {
    try {
        const { refreshToken } = req.body;
        const user = await User.findOne({email: req.user.email})
        if (!user || !user.refreshToken.includes(refreshToken)) {
            res.status(403).json({
                message: "unauthorized user refresh token"
            })
        }
        const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
        if (decoded) {
            const token = jwt.sign({ user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                    }}, process.env.JWT_SECRET_KEY, { expiresIn: "10m"})

            res.status(200).json({
                accessToken: token
            })
        }
            
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack: error.stack
        })
    }

}


module.exports = accessToken