const User = require('../models/User');
const crypto = require('crypto');
const HASHKEY = process.env.HASHKEY;
const jwt = require('jsonwebtoken');
const { success, failure, error } = require('./response')

function authController() { return {
    async register(req, res) { try {
        const { username, password } = req.body
        let user
        
        user = await User.findOne({username})
        if(user) return failure(res, 'Username already exists')

        const hash = crypto.createHmac('sha256', HASHKEY).update(password).digest('hex')
        user =  await User.create({ username, password: hash })

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_KEY, {expiresIn: '1y'})
        success(res, 'User successfully created', { token, user })
    } catch (err) { error(res, err) } },
    
    async login(req, res) { try {
        const { username, password } = req.body
        const hash = crypto.createHmac('sha256', HASHKEY).update(password).digest('hex')
        const user =  await User.findOne({ username, password: hash})

        if(!user) return failure(res, 'Username and password does not match')

        const token = jwt.sign({ user_id: user._id }, process.env.JWT_KEY, {expiresIn: '1y'})
        success(res, 'User successfully logged in', { token, user })
    } catch (err) { error(res, err) } },
}}

module.exports = authController

