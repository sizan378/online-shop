// external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal imports
const User = require('../../../model/user/userSchema')


async function userRegistrations(req, res, next) {
    try {
        let newUser
        const passwordHash = await bcrypt.hash(req.body.password, 10)
        console.log("passwordHash: ", passwordHash)
        newUser = new User({
            ...req.body,
            password: passwordHash
        })
        newUser.save()
        res.status(200).json({
            message: "User register successfully"
        })
    } catch (error) {
        res.status(500).json({error: error})
    }
}


async function userLogin(req, res, next) {
    try {
        const user = await User.findOne({ email: req.body.email, is_active: true });
        if (user && await bcrypt.compare(req.body.password, user.password) ) {
            const token = jwt.sign({ user: {
                            id: user.id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phoneNumber: user.phoneNumber,
                        }}, process.env.JWT_SECRET_KEY, { expiresIn: "1h"})

            const refreshToken = jwt.sign({ user: {
                            id: user.id,
                        }}, process.env.JWT_SECRET_KEY, { expiresIn: "10d"})

            await User.findOneAndUpdate({email: req.body.email}, {refreshToken: refreshToken})
            res.status(200).json({
                accessToken: token,
                refreshToken: refreshToken
            })
        } else {
            res.status(401).json({
                message: 'unauthorized user',
            });
        }
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}

async function userPasswordChange(req, res, next) {
    try {
        oldPassword = req.body.oldPassword;
        const user = await User.findOne({email: req.user.email});
        if (user && await bcrypt.compare(oldPassword, user.password)) {
            const passwordHash = await bcrypt.hash(req.body.newPassword, 10)
            await User.updateOne({_id: req.params.id}, {password: passwordHash});
            res.status(200).json({
                message: 'Password updated successfully'
            })
        } else {
            res.status(400).json({
                message: "email or password incorrect"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
            stack : error.stack
        })
    }
}

module.exports = { userRegistrations, userLogin, userPasswordChange }