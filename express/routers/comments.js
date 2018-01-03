const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const CommentModel = require('../models/commentModel')

router.post('/', checkLogin, (req, res, next) => {
  const comment = {
    author: req.session.user._id,
    postId: req.fields.postId,
    content: req.fields.content
  }

  try {
    if (!comment.content.length) {
      throw new Error('请填写留言内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  CommentModel.create(comment)
    .then(() => {
      req.flash('success', '留言成功')
      res.redirect('back')
    })
    .catch(next)
})
router.get('/:commentId/remove', checkLogin, (req, res, next) => {
  const commentId = req.params.commentId
  const author = req.session.user._id

  CommentModel.findOne({_id: commentId})
    .then((comment) => {
      let msg = ''

      if (!comment) {
        msg = '该留言不存在'
      } else if (comment.author.toString() !== author.toString()) {
        msg = '没有权限删除留言'
      }

      if (msg) {
        req.flash('error', msg)
        return res.redirect('back')
      }

      comment.remove()
        .then(() => {
          req.flash('success', '删除成功')
          return res.redirect('back')
        })
        .catch(next)
    })
    .catch(next)
})

module.exports = router