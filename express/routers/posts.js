const express = require('express')
const router = express.Router()
const marked = require('marked')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/postModel')
const CommentModel = require('../models/commentModel')

router.get('/', (req, res, next) => {
  const author = req.query.author

  PostModel.getPosts(author).then(function(posts) {
    posts.map(function(post){
      post.content = marked(post.content)
      post.created_at = moment(objectIdToTimestamp(post._id)).format('YYYY-MM-DD HH:mm')
      return post
    })
    Promise.all(posts.map((post) => {
      return CommentModel.count({postId: post._id}).then((count) => {
        post.commentsCount = count
        return post
      })
    })).then((a, b) => {
      res.render('posts', {posts})
    })
  }).catch(next)
})

router.get('/create', checkLogin, (req, res, next) => {
  res.render('create')
})

router.post('/create', checkLogin, (req, res, next) => {
  let author = req.session.user._id
  let title = req.fields.title
  let content = req.fields.content

  try {
    let msg = ''

    if (!title.length) {
      msg = '请输入标题'
    } else if (!content.length) {
      msg = '请输入内容'
    }

    if (msg) {
      throw new Error(msg)
    }
  } catch (e) {
    req.flash('error', e.message)
    res.redirect('back')
  }

  PostModel.create({
    title,
    content,
    author,
    pv: 1
  }).then((post) => {
    req.flash('success', '文章发表成功')
    res.redirect(`/posts/${post._id}`)
  }).catch(() => {
    next()
  })
})

router.get('/:postId', (req, res, next) => {
  const postId = req.params.postId

  Promise.all([
    PostModel.getPostById(postId),
    CommentModel.getComments(postId),
    CommentModel.count({postId}),
    PostModel.incPv(postId)
  ]).then(function(result) {
    const post = result[0]
    const comments = result[1]
    const count = result[2]

    console.log(comments);

    if (!post) {
      throw new Error('文章不存在')
    }
    post.commentsCount = count
    post.content = marked(post.content)
    post.created_at = moment(objectIdToTimestamp(post._id)).format('YYYY-MM-DD HH:mm')

    res.render('post', {post, comments})
  }).catch(next)
})

router.get('/:postId/edit', checkLogin, (req, res, next) => {
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getPostById(postId)
    .then(function(post) {
      let msg = ''

      if (!post) {
        msg = '该文章不存在'
      } else if (author.toString() !== post.author._id.toString()){
        msg = '权限不足'
      }

      if (msg) {
        throw new Error(msg)
      }

      res.render('edit', post)
    })
    .catch(next)
})

router.post('/:postId/edit', checkLogin, (req, res, next) => {
  const postId = req.params.postId
  const author = req.session.user._id
  const title = req.fields.title
  const content = req.fields.content

  try {
    let msg = ''

    if (!title.length) {
      msg = '请填写标题'
    } else if (!content.length) {
      msg = '请填写内容'
    }

    if (msg) {
      throw new Error(msg)
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  PostModel.getPostById(postId)
    .then(function(post) {
      let msg = ''

      if (!post) {
        msg = '文章不存在'
      } else if (post.author._id.toString() !== author.toString()) {
        msg = '没有权限'
      }

      if (msg) {
        throw new Error(msg)
      }
      PostModel.updatePostById(postId, {title, content})
        .then(function(){
          req.flash('success', '编辑文章成功')
          res.redirect(`/posts/${postId}`)
        })
        .catch(next)
    })
})

router.get('/:postId/remove', checkLogin, (req, res, next) => {
  const postId = req.params.postId
  const author = req.session.user._id

  PostModel.getPostById(postId)
    .then((post) => {
      let msg = ''

      if (!post) {
        msg = '该文章不存在'
      } else if (post.author._id.toString() !== author.toString()) {
        msg = '没有权限'
      }

      if (msg) {
        throw new Error(msg)
      }
      PostModel.delPostById(postId)
        .then(() => {
          req.flash('success', '删除文章成功')
          res.redirect('back')
        })
        .catch(next)
    })
})

module.exports = router