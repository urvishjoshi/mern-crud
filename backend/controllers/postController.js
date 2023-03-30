const Post = require('../models/Post')
const { success, error } = require('./response')

module.exports = () => { return {
    async feed(req, res) { try {
        const data = await Post.find().populate('owner').sort({'createdAt': -1})
        success(res, 'Feed fetched successfully', data)
    } catch (err) { error(res, err) } },

    async post(req, res) { try {
        const { user, title, message } = req.body
        
        const post = await Post.create({ title, message, owner: user._id })
        success(res, 'Post created successfully', post)
    } catch (err) { error(res, err) } },
    
    async delete(req, res) { try {
        await Post.findByIdAndDelete(req.params.id)
        success(res, 'Post deleted successfully')
    } catch (err) { error(res, err) } },
}}
