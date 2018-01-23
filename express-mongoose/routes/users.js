var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/detail/:_id', function(req, res, next) {
  userModel.findOne({_id: req.params._id}, function(err, data) {
    res.render('UserDetail', data);
  })
})
router.get('/list', function(req, res, next) {
  userModel.find(function(err, users) {
    if (err) {
      return console.log(users);
    }

    res.render('UserList', {
      users: users
    })
  })
});
router.get('/add', function(req, res, next) {
  res.render('UserAdd');
});
router.post('/add', function(req, res, next) {
  var newUser = new userModel(req.body);

  newUser.save(function(err, data) {
    if (err) {
      return console.log(err);
    }
    res.redirect('/users/list');
  })
});
router.get('/edit/:_id', function(req, res, next) {
  userModel.findOne(req.params, function(err, data) {
    res.render('UserEdit', data);
  })
});
router.post('/edit/:_id', function(req, res, next) {
  userModel.update({_id:req.params._id}, {$set: req.body}, function(err, data) {
    res.redirect('/users/detail/' + req.params._id);
  })
});
router.delete('/del', function(req, res) {
  userModel.remove({_id: req.query.id}, function(err, data) {
    if (err) {
      return console.log(err);
    }

    res.json({code:200, msg:'删除成功'});
  })
})

module.exports = router;
