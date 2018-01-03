const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId
  },
  content: {
    type: 'string'
  },
  postId: {
    type: Schema.Types.ObjectId
  }
})
commentSchema.index({postId: 1, _id: -1})

commentSchema.statics = {
  // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
  getComments: function(postId) {
    return this.find({postId})
      .populate({
        path: 'author',
        model: 'User'
      })
      .sort({
        _id: 1
      })
      .exec()
  }
}

module.exports = mongoose.model('Comment', commentSchema)