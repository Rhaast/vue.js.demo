var mongoose = require('mongoose')  //require不用指定路径，因为它会一层一层的去查找库
var Schema = mongoose.Schema;    //Schema会绑定数据库中的一个集合

var produtSchema = new Schema({    //定义商品模型的名称，数据类型
    "productId":{type:String},
    "productName":String,
    "salePrice":Number,
    "productImage":String

});

module.exports = mongoose.model('Good',produtSchema);    //匿名输出模型，输出去就可以基于模型来调取它的API方法
