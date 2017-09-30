//服务端去调第三方的接口

var http = require('http');

let util = require('util');

http.get('http://www.imooc.com/u/card',function(res){
    let data = '';     //存放接受的数据
    res.on("data",function(chunk){    //res.on监听获取数据
       data += chunk;
    });

    res.on("end",function(){      //res.on监听有没有完成
      let result = JSON.parse(data);    //parse可将data里的数据转为字符串然后输出
      console.log("result:"+util.inspect(result)); //util.inspect可对输出结果进行调试
    })


});
