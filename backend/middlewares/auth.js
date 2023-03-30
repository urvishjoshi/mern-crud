const jwt = require('jsonwebtoken')
const User = require('../models/User');


module.exports = async (req, res, next) => {
    try{
        const bearer_token = req.headers.authorization.split(' ')[1]
        const token = jwt.verify(bearer_token, process.env.JWT_KEY)

        let user = await User.findById({_id: token.user_id})
        if (!user) {
            jwt.destroy(bearer_token)
            return res.status(404).json(`User is not available`).end()
        }
            
        req.body.user = user
        next()
    } catch {
        return res.status(401).json(`Unauthorized`).end()
    }
}