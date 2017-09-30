let user = require('./User');

console.log(`userName:${user.userName}`);

console.log(`I'm ${user.userName},I say ${user.sayHello()}`);

let http = require('http');   //获取请求协议
let url = require('url');    //获取请求地址
let util = require('util');


let server = http.createServer((req,res)=>{ // 创建服务器端
    res.statusCode = 200;     //响应状态码200；

    res.setHeader("content-Type","text/plain; charset=utf-8");   //构建请求头

    console.log("url"+req.url);  //打印URL地址,然后对完整的地址进行字符串解析，然后协议就能显示出来

    console.log("parse:"+url.parse(req.url))

    console.log("inspect:"+util.inspect(url.parse(req.url)));
    res.end(util.inspect(url.parse(req.url)));    //访问服务器时的输出通过inspect将URL对象转换成字符串进行输出，用于调试
});

server.listen(3000,'127.0.0.1', ()=>{
    console.log("服务器已经运行，请打开浏览，输入:http://127.0.0.1:3000/来运行.")
});   //监听端口。node.js端口一般默认3000
