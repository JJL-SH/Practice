const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  getPostById: function(postId) {
    return this
      .findOne({
        _id: postId
      })
      .populate({
        path: 'author',
        model: 'User'
      })
      .exec()
  },
  updatePostById: function(postId, data) {
    return this
      .update({
        _id: postId
      }, {$set: data})
      .exec()
  },
  delPostById: function(postId) {
    return this
      .remove({_id: postId})
      .exec()
  },
  getPosts: function(author) {
    let query = {}

    if (author) {
      query.author = author
    }

    return this
      .find(query)
      .populate({
        path: 'author',
        model: 'User'
      })
      .sort({_id: -1})
      .exec()
  },
  incPv: function(postId) {
    return this
      .update({_id: postId}, {$inc: {pv: 1}})
      .exec()
  }
}

module.exports = mongoose.model('Post', PostSchema)