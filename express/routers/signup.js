const fs = require('fs')
const path = require('path')
const sha1 = require('sha1')
const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/userModel')

router.get('/', checkNotLogin, (req, res, next) => {
  res.render('signup')
})

router.post('/', checkNotLogin, (req, res, next) => {
  let name = req.fields.name
  let gender = req.fields.gender
  let bio = req.fields.bio
  // path.sep 获取不同系统目录区分符号 window[\] mac[/]
  let avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password
  let repassword = req.fields.repassword
  let user = null

  try {
    let msg = ''

    if (!(name.length >= 1 && name.length <= 10)) {
      msg = '名字请限制在 1-10 个字符'
    } else if (['m', 'f', 'x'].indexOf(gender)) {
      msg = '性别只能是 m、f、x'
    } else if (!(bio.length >= 1 && bio.length <= 30)) {
      msg = '个人简介请限制在 1-30 个字符'
    } else if (!req.files.avatar.name) {
      msg = '缺少头像'
    } else if (password.length < 6) {
      msg = '密码至少 6 个字符'
    } else if (password !== repassword) {
      msg = '两次输入密码不一致'
    }

    if (msg) {
      throw new Error(msg)
    }
  } catch (e) {
    fs.unlink(req.files.avatar.path)
    req.flash('error', e.message)
    return res.redirect('/signup')
  }

  user = {
    name,
    password: sha1(password),
    gender,
    bio,
    avatar
  }

  UserModel.create(user).then((result) => {
    delete user.password
    req.session.user = user;
    req.flash('success', '注册成功')
    res.redirect('/posts')
  }).catch((e) => {
    fs.unlink(req.files.avatar.path)
    if (e.message.match('dup key')) {
      req.flash('error', '用户名已被占用')
      return res.redirect('/signup')
    }
    next(e)
  })
})

module.exports = router