## react+react-router-dom+redux+saga脚手架

### 目录结构
```
config        // 配置文件
-|config.js
dist          // 打包生成文件
src           // 开发目录
-|action
-|component   // 组件目录
-|font        // 字体包
-|images
-|page        // 页面
-|reducer
-|saga
-|scss
package.json
webpack.config.build.js
webpack.config.dev.js
webpack.config.js
```

### 启动命令
开发环境 ```npm start```

打包代码 ```npm run build```

### 脚手架简介
- 使用了chrome的Redux开发工具，可以到商店下载
- 路由使用了react-router-dom V4 版本
- 添加了对saga的支持
- 字体图标在 src/font/alibaba/demo_fontclass.html 查看，使用了alibaba字体库