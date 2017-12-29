const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/postModel')

router.get('/', (req, res, next) => {
  res.send('posts')
})
router.get('/create', checkLogin, (req, res, next) => {
  res.render('create');
})
router.post('/create', checkLogin, (req, res, next) => {
  let author = req.session.user._id
  let title = req.fields.title
  let content = req.fields.content

  console.log(req.session.user);
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
  res.send('文章详情页');
})
router.get('/:postId/edit', checkLogin, (req, res, next) => {
  res.send('更新文章页');
})
router.post('/:postId/edit', checkLogin, (req, res, next) => {
  res.send('更新文章');
})
router.get('/:postId/remove', checkLogin, (req, res, next) => {
  res.send('删除文章');
})



router.post('/test', (req, res, next) => {
  PostModel.getPosts().exec(function(err, test){
    res.send(test)
  });
})
module.exports = router;