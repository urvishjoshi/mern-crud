const authController = require('../controllers/authController')
const postController = require('../controllers/postController')
const auth = require('../middlewares/auth')
const express = require("express");
const router = express.Router();

// auth
router.post('/signup', authController().register)
router.post('/signin', authController().login)

// post
router.get('/feed', auth, postController().feed)
router.post('/post', auth, postController().post)
router.put('/post/:id', auth, postController().updatePost)
router.delete('/post/:id', auth, postController().delete)

module.exports = router
