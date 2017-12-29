const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/userModel')

router.get('/', checkNotLogin, (req, res, next) => {
  res.render('signin');
})
router.post('/', checkNotLogin, (req, res, next) => {
  let name = req.fields.name
  let password = req.fields.password

  try {
    let msg =''

    if (!name.length) {
      msg = '请填写用户名'
    }
    if (!password.length) {
      msg = '请填写密码'
    }

    if (msg) {
      throw new Error(msg)
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }
  UserModel.findOne({name}).then((user) => {
    let msg = ''

    if (!user) {
      msg = '用户不存在'
    } else if (user.password !== sha1(password)) {
      msg = '用户名或密码错误'
    }

    if (msg) {
      req.flash('error', msg)
      return res.redirect('back')
    }

    delete user.password
    req.flash('success', '登录成功')
    req.session.user = user
    console.log(req.session);
    res.redirect('/posts')
  })
})

module.exports = router;
