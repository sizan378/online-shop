// external imports
const jwt = require('jsonwebtoken')

async function tokenValidation(req, res, next) {
    const tokenHeader = req.headers.authorization

    if (tokenHeader === undefined) {
        res.status(401).json({
            message: "user credentials were not provided"
        })
    } 

    if (tokenHeader && tokenHeader.startsWith('Bearer')) {
        token = tokenHeader.split(' ')[1]
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded.user
            next()
        } catch (error) {
            res.status(400).json({
                error: error.message,
                stack: error.stack
            });
        }
        
    }
}


module.exports = tokenValidation