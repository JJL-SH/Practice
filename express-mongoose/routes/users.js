var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
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
  console.log(req.body);
});

module.exports = router;
