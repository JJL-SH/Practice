const express = require('express')
const router = express.Router()
const marked = require('marked')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/postModel')

router.get('/', (req, res, next) => {
  const author = req.query.author

  PostModel.getPosts(author).then(function(posts) {
    posts.map(function(post){
      post.content = marked(post.content)
      post.created_at = moment(objectIdToTimestamp(post._id)).format('YYYY-MM-DD HH:mm')
      return post
    })
    res.render('posts', {posts})
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
    PostModel.incPv(postId)
  ]).then(function(result) {
    const post = result[0]

    if (!post) {
      throw new Error('文章不存在')
    }

    post.content = marked(post.content)
    post.created_at = moment(objectIdToTimestamp(post._id)).format('YYYY-MM-DD HH:mm')

    res.render('post', {post})
  }).catch(next)
})
router.get('/:postId/edit', checkLogin, (req, res, next) => {
  res.send('更新文章页')
})
router.post('/:postId/edit', checkLogin, (req, res, next) => {
  res.send('更新文章')
})
router.get('/:postId/remove', checkLogin, (req, res, next) => {
  res.send('删除文章')
})

module.exports = router;