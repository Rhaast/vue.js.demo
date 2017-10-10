# imoocmall

> Imooc Mall

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



* 一、node.js特点
  * 1、基于Chrome V8引擎
  * 2、单线程
  * 3、使用JavaScript开发后端代码
  * 4、非阻塞的IO


* 二、在common规范里，一个JS文件代表一个模块。

* 三、windows平台下MongoDB安装和环境搭建

  * MongoDB数据库特点：
    * 1、高可扩展性
    * 2、分布式存储（以JSON文档进行存储）
    * 3、低成本
    * 4、结构灵活

  * MongoDB的环境搭建以及配置
    * 1、下载安装包或者压缩包
    * 2、添加db存储和日志存储文件夹
    * 3、添加服务、配置环境变量、在CMD里启动mongo

  * MongoDB创建用户
    * 1、创建管理员
    * 2、授权认证
    * 3、给使用的数据库添加用户

  * MongoDB基本语法
    * 1、插入文档
    * 2、更新文档
    * 3、删除文档
    * 4、查询文档
    * 5、基本指令：
      * 1、创建集合：先进入到mongo，用use demo指令先创建一个数据库，然后通过 db.createCollection("user")或者db.users.insert({id:123,name:'hello'})可以创建一个集合。创建完成可通过show collections的指令来查看所创建的集合。
      * 2、删除当前数据库：db.dropDatabase()，删除当前集合：db.user.drop()
      * 3、查看当前数据库下的所有数据：db.user.find(),像数据格式化可以写成db.user.find().pretty(),查询第一条数据db.user.findOne()
      * 4、更新当前数据：db.user.update({userName:'jack'},{$set:{userAge:30}})
      * 5、在命令行中插入整个数据表：mongoimport -d db_demo -c users --file C:\Users\PVer\Desktop\dumall-users，其中db_是数据库的名称，users是集合名称，file后面的是文件路径

* 四、node.js启动调试方式
    * 1、通过node命令启动
    * 2、webstorm配置启动入口
    * 3、PM2插件(在CMD里通过pm2 start server/bin/www方式启动node.js，不用结束操作或者另开CMD窗口就能继续执行其他的命令，通过PM2 list可以查看当前启动了几个node.js项目，通过PM2 log可以查看日志，通过PM2 stop server/bin/www可停止当前启动项，PM2 stop all可停止所有启动项。)

* 五、基于Express开发商品列表查询接口
    * 1、安装Mongoose（Mongoose就是对mongoDB的封装）
    * 2、创建model
    * 3、创建路由
    * 4、基于mongoose，实现商品列表的查询功能
* 六、指定代理proxyTable
    ```js
        proxyTable: {
      '/goods':{
          target:'http://localhost:3000'
      }
    },
    ```
    * 当访问/goods的时候，代理插件会转发到locahost：3000下面的goods，而不是前端的goods
* 七、启动mongoDB数据库的指令
    * mongod -storageEngine mmapv1 -dbpath c:\mongoDB\data
