# basis-gulp

## 简介
基于gulp打包HTML的手脚架。使用[page](https://github.com/visionmedia/page.js)前端路由，使得拥有更好的用户体验。本项目适合没有专业SPA前端技术公司作为公司门户或个人博客，当然你也可以作为后台管理的前后端分离手脚架

## 优势
1. gulp 打包使得html、css、js文件最小化，减轻服务器压力
2. 使用less开发自动会编译成css(这里要注意的是html引用的文件还是*.css，而不是*.less)
3. 添加文件修改监听自动刷新浏览器，释放F5
4. 页面跳转不闪白，体验更优。
5. 速度更快，首页加载完资源后其它碎片页面直接共享，无需重复加载。页面碎片化内容越少加载速度越快

## 缺点
1. 应为是碎片化的html所以对SEO不利
2. 待发现...

## 注意点
1. gulp打包的时候plugins文件夹下的所有文件只会做拷贝不做压缩处理
2. image文件会在打包的时候压缩，如果不需要压缩在gulpfile.js文件中修改
3. 待补充...

## 项目结构
```bash
basis-gulp
├── src --开发目录
        ├── css                 -- 这个文件夹中的文件都由less文件打包而来
        ├── img                 -- 静态图片存放
        ├── js                  -- js文件存放
        ├      └── config.js   -- 这里配置路由等信息
        ├── less                -- less文件存放，该文件夹不会打成生产包。
        ├── page                -- 页面碎片存放
        ├── plugins             -- 插件存放
        └── index.html          -- 宿页
```

## 开发
```bash

# 克隆项目
git clone https://gitee.com/laizuan/basis-gulp.git

# 安装依赖
npm install

# 启动服务
gulp run

```

## 打包

```bash

#打包生产包
gulp build

```

## Nginx 代理设置

```text
server {
	listen   80;
    charset utf-8;        
    server_name localhost;
     location / {
        root \dist; #网站的根目录
        index index.html; #默认文件
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 技术选型

技术 | 名称 | 官网
----|---------|------------
gulp | 基于流的自动化构建工具 | [https://www.gulpjs.com.cn/](https://www.gulpjs.com.cn/)
jQuery | 函式库  | [http://jquery.com/](http://jquery.com/)
page | 前端路由 | [https://github.com/visionmedia/page.js](https://github.com/visionmedia/page.js)
swiper | 轮播图 | [http://idangero.us/swiper/](http://idangero.us/swiper/)
Headroom | 隐藏或展示页面元素 | [http://www.bootcss.com/p/headroom.js/](http://www.bootcss.com/p/headroom.js/)
NProgress | 网页进度条 | [http://ricostacruz.com/nprogress/](http://ricostacruz.com/nprogress/)

## 效果图
![demo](https://11-1252792348.cos.ap-guangzhou.myqcloud.com/basis-gulp.gif)

## 捐助

如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 :tropical_drink:
![donate](https://11-1252792348.cos.ap-guangzhou.myqcloud.com/donation.jpg)


## License

[MIT](https://gitee.com/laizuan/basis-gulp/blob/master/LICENSE)