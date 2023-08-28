// external imports
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// internal imports
const User = require('../model/user/userSchema')


async function accessToken(req, res, next) {
    try {
        const { refreshToken } = req.body;
        const decoded = await jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
        if (decoded && mongoose.Types.ObjectId.isValid(decoded.user.id)) {

            const user = await User.findById({_id: decoded.user.id})
            if (!user || !user.refreshToken.includes(refreshToken)) {

                res.status(403).json({
                    message: "unauthorized user"
                })
            }

            const token = jwt.sign({ user: {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        phoneNumber: user.phoneNumber,
                    }}, process.env.JWT_SECRET_KEY, { expiresIn: "1h"})

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