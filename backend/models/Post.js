const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)
