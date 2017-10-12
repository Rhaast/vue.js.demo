var mongoose = require('mongoose') //require不用指定路径，因为它会一层一层的去查找库

var userSchema = new mongoose.Schema({ //定义商品模型的名称，数据类型
	"userId": String,
	"userName": String,
	"userPwd": String,
	"orderList": Array,
	"cartList": [{
		"productId": String,
		"productName": String,
		"salePrice": String,
		"productImage": String,
		"checked": String,
		"productNum": String

	}],
	"addressList": [{
			"addressId": String,
			"userName": String,
			"streetName": String,
			"postCode": Number,
			"tel": Number,
			"isDefault": Boolean

		}

	]
});

module.exports = mongoose.model('Users', userSchema); //匿名输出模型，输出去就可以基于模型来调取它的API方法