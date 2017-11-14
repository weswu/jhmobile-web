# jihui-mobile-webapps

> 这是一个用vue2编写的会员后台App。

[在线地址](http://app.jihui88.com)

### 技术栈
- 传说中的VUE全家桶(vue vue-router vuex)
- [axios](https://github.com/axios/axios) ajax类
- [jsonp](https://github.com/axios/axios/blob/d982cf99324124582721d1cd15a99cb975e93716/COOKBOOK.md#jump-to-line) 跨域请求
- [Muse-UI](http://www.muse-ui.org/#/install) 一个基于Vue2.x的material design 风格UI框架
- [localResizeIMG](https://github.com/think2011/localResizeIMG) 图片压缩上传
- [material](https://material.io/icons/) css字体图标
- [vue-baidu-map](https://dafrok.github.io/vue-baidu-map/#/zh/overlay/marker) 百度地图

## 运行截图
![登录](https://github.com/weswu/jhmobile-web/raw/master/screenshots/1.png)
![首页](https://github.com/weswu/jhmobile-web/raw/master/screenshots/2.png)
![详情](https://github.com/weswu/jhmobile-web/raw/master/screenshots/3.png)

## 安装运行（Build Setup）

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## TODO

- [ ]  实现图片压缩上传
- [ ]  留言右侧移动删除

## 项目目录
<pre>
.
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build后的目录
├── src                // 源码目录
│   ├── assets         // css
│   ├── components     // 各种组件
│   ├── router         // vue路由的配置
│   ├── utils          // 各种过滤器,方法
│   ├── views          // 各种页面
│   ├── vuex           // vuex状态管理器
│   └── main.js        // Webpack 预编译入口
├── static             // 项目静态，图片资源
├── test               // 测试
├── .babelrc           // ES6语法编译配置
├── .editorconfig      // 代码编写规格
├── .gitignore         // 忽略的文件
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── README.md          // 说明
</pre>


## 参考
- [NeteaseCloudWebApp](https://github.com/javaSwing/NeteaseCloudWebApp)
- [cnode-code](https://github.com/mov1er/cnode-code)
