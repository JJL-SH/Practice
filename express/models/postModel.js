const mongoose = require('mongoose')
const Schema = mongoose.Schema
const marked = require('marked')

var PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: 'string'
  },
  content: {
    type: 'string'
  },
  pv: {
    type: 'number'
  }
})

PostSchema.pre('save', (next) => {
  next()
})

PostSchema.statics = {
  getPosts: function(author) {
    let query = {}

    if (author) {
      query.author = author
    }

    return this
      .find(query)
      .populate({
        path: 'xxxx',
        model: 'User'
      })
      .sort({_id: -1})
  }
}

module.exports = mongoose.model('Post', PostSchema)