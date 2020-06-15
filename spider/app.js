const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const app = express();
const Bufferhelper =require('bufferhelper');
const fs = require('fs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/book');

var treeSchema = new mongoose.Schema({
  img: String,
  name: String,
  desc: String,
  author: String,
  type: String,
  subType: String,
  size: String,
  status: String
})
var treeModel = mongoose.model('tree', treeSchema);

//解决编码转换模块
var iconv = require('iconv-lite'); 

function trim(str) {
  return str.replace(/\n\r|\n|\r|\r\n|\s/g, '');
}
app.get('/', function(req, res) {
  for (var i = 1; i <= 41060; i++) {
    // var bufferhelper =new Bufferhelper();
    request('https://www.qidian.com/all?orderId=&style=1&pageSize=20&siteid=1&pubflag=0&hiddenField=0&page=' + i, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // bufferhelper.concat(body);
        // var test = iconv.decode(bufferhelper.toBuffer(),'gbk');
        $ = cheerio.load(body);
        var tree = [];
        $('.all-img-list li').each(function(){
          var that = $(this);
          var url = that.find('.book-img-box img').attr('src').substr(2);
          var picName = +new Date() + '-' + parseInt(Math.random() * 10000, 10) + '.jpg';
          var info = {
            img: picName,
            name: that.find('h4').text(),
            desc: trim(that.find('.intro').text()),
            author: that.find('.author a').eq(0).text(),
            type: that.find('.author a').eq(1).text(),
            subType: that.find('.author a').eq(2).text(),
            size: trim(that.find('.update').text()),
            status: that.find('.author span').text()
          }
          
          treeModel.update({name: info.name, author: info.author}, info, {upsert:true}, function(err, response){
            if (!response.nModified) {
              request({
                url: 'http://' + url,
                encoding: null
              }, function(error, doc, body){
                fs.writeFile('./public/book/'+picName, body, function(){
                  
                })
              })
            }
          });
        })
      }
    })
  }
})

app.listen(3000);
