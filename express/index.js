const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const routes = require('./routers');
const pkg = require('./package');
const winston = require('winston')
const expressWinston = require('express-winston')
const moment = require('moment')

const app = express();
require('./lib/mongo')

// 设置模板编译器
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
// session中间件
app.use(session({
  // 设置 cookie 中保存 session id 的字段名称
  name: config.session.key,
  // 通过设置 secret 来计算 hash 值并存在 cookie 中，使产生的 signedCookie 防篡改
  secret: config.session.secret,
  // 强制更新 session
  resave: true,
  // 设置为 false，强制创建一个 session，即使用户未登录
  saveUninitialized: false,
  // 过期时间，过期后 cookie 中的 session id 自动删除
  cookie: {
    maxAge: config.session.maxAge
  },
  // 将 session 存储到 mongodb
  store: new MongoStore({
    url: config.mongodb
  })
}));
// flash 中间件，用来显示通知
app.use(flash());
// 处理form表单提交
app.use(require('express-formidable')({
  // 上传文件目录
  uploadDir: path.join(__dirname, 'public/images'),
  // 保留后缀
  keepExtensions: true
}))
// 设置模板全局常亮
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}
// 添加模板必需的三个变量
app.use((req, res, next) => {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: `logs/${moment().format('YYYY-MM-DD')}.log`
    })
  ]
}))
routes(app);
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: `logs/${moment().format('YYYY-MM-DD')}.log`
    })
  ]
}))

app.listen(config.port, () => {
  console.log(`${pkg.name} listening on port ${config.port}`);
})