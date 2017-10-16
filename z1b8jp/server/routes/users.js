var express = require('express');
var router = express.Router();
require('./../util/util') //加入util工具类，可在接口中使用生成动态时间日期正则表达式


var User = require('./../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
	res.send('test');
});

//登陆接口

router.post("/login", function(req, res, next) {
	var param = {
		userName: req.body.userName,
		userPwd: req.body.userPwd //post请求通过body来接收前端传过来的参数
	}
	User.findOne(param, function(err, doc) {
		if (err) { //如果err有值，说明报错了。返回空
			res.json({
				status: "1",
				msg: err.message
			});
		} else {

			if (doc) {
				res.cookie("userId", doc.userId, { //登陆成功保存信息到cookie，方便前端获取用户信息
					path: '/',
					maxAge: 1000 * 60 * 60
				});
				res.cookie("userName", doc.userName, { //登陆成功保存信息到cookie，方便前端获取用户信息
					path: '/',
					maxAge: 1000 * 60 * 60
				});
				// req.session.user = doc;
				res.json({
					status: '0',
					msg: '',
					result: {
						userName: doc.userName //登陆成功展现用户名
					}
				});
			}
		}
	});
});

//登出接口
router.post("/logout", function(req, res, next) { //清空cookie
	res.cookie("userId", "", {
		path: "/",
		maxAge: -1 //生命周期
	});
	res.json({
		status: "0",
		msg: '',
		result: ''
	})

});
// 检查是否登陆
router.get("/checkLogin", function(req, res, next) {
	if (req.cookies.userId) { //如果cookies里有用户id说明登陆
		res.json({
			status: '0',
			msg: '',
			result: req.cookies.userName || '' //登陆成功取到用户名，并将用户名保存到cookies之中如果取不到则为空
		});
	} else {
		res.json({
			status: '1',
			msg: '未登录',
			result: ''
		});
	}

});

// 查询当前用户的购物车数据,添加商品到购物车页面
router.get("/cartList", function(req, res, next) {
	var userId = req.cookies.userId;
	User.findOne({
		userId: userId
	}, function(err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			if (doc) {
				res.json({
					status: '0',
					msg: '',
					result: doc.cartList
				});
			}
		}

	});
});
//购物车删除
router.post("/cartDel", function(req, res, next) {
	var userId = req.cookies.userId,
		productId = req.body.productId;
	User.update({
		userId: userId
	}, {
		$pull: {
			'cartList': {
				'productId': productId
			}
		}
	}, function(err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			res.json({
				status: '0',
				msg: '',
				result: 'suc'
			});
		}
	});
});

//修改商品数量
router.post("/cartEdit", function(req, res, next) {
	var userId = req.cookies.userId,
		productId = req.body.productId,
		productNum = req.body.productNum,
		checked = req.body.checked; //选中商品
	User.update({
		"userId": userId,
		"cartList.productId": productId
	}, {
		"cartList.$.productNum": productNum,
		"cartList.$.checked": checked,
	}, function(err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			res.json({
				status: '0',
				msg: '',
				result: 'suc'
			});
		}
	})
});
//购物车的修改全选
router.post("/editCheckAll", function(req, res, next) {
	var userId = req.cookies.userId,
		checkAll = req.body.checkAll ? '1' : '0';
	User.findOne({
		userId: userId
	}, function(err, user) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			if (user) {
				user.cartList.forEach((item) => {
					item.checked = checkAll;
				})
				user.save(function(err1, doc) {
					if (err1) {
						res.json({
							status: '1',
							msg: err1,
							message,
							result: ''
						});
					} else {
						res.json({
							status: '0',
							msg: '',
							result: 'suc'
						});
					}
				})
			}
		}
	});
});

//获取地址列表
router.get("/addressList", function(req, res, next) {
	var userId = req.cookies.userId;
	User.findOne({
		userId: userId
	}, function(err, doc) {

		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			res.json({
				status: '0',
				msg: '',
				result: doc.addressList
			});
		}

	})

});
//设置默认地址接口
router.post("/setDefault", function(req, res, next) {
	var userId = req.cookies.userId,
		addressId = req.body.addressId;
	if (!addressId) {
		res.json({
			status: '1003',
			msg: 'addressId is null',
			result: ''
		});
	} else {
		User.findOne({
			userId: userId
		}, function(err, doc) {
			if (err) {
				res.json({
					status: '1',
					msg: err.message,
					result: ''
				});
			} else {
				var addressList = doc.addressList;
				addressList.forEach((item) => {
					if (item.addressId == addressId) {
						item.isDefault = true;
					} else {
						item.isDefault = false;
					}
				});

				doc.save(function(err1, doc1) {
					if (err) {
						res.json({
							status: '1',
							msg: err.message,
							result: ''
						});
					} else {
						res.json({
							status: '0',
							msg: '',
							result: ''
						});
					}
				})
			}
		});
	}
});
//删除地址接口
router.post("/delAddress", function(req, res, next) {
	var userId = req.cookies.userId,
		addressId = req.body.addressId;
	User.update({
		userId: userId
	}, {
		$pull: {
			'addressList': {
				'addressId': addressId
			}
		}
	}, function(err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			res.json({
				status: '0',
				msg: '',
				result: ''
			});
		}
	});
});

router.post("/payMent", function(req, res, next) {
	var userId = req.cookies.userId,
		addressId = req.body.addressId,
		orderTotal = req.body.orderTotal;
	User.findOne({
		userId: userId
	}, function(err, doc) {
		if (err) {
			res.json({
				status: "1",
				msg: err.message,
				result: ''
			});
		} else {
			var address = '',
				goodsList = [];
			//获取当前用户的地址信息
			doc.addressList.forEach((item) => {
					if (addressId == item.addressId) {
						address = item;
					}
				})
				//获取用户购物车的购买商品
			doc.cartList.filter((item) => {
				if (item.checked == '1') {
					goodsList.push(item);
				}
			});

			var platform = '622'; //系统架构平台码，用于生成订单id
			var r1 = Math.floor(Math.random() * 10);
			var r2 = Math.floor(Math.random() * 10);

			var sysDate = new Date().Format('yyyyMMddhhmmss'); //生成订单日期
			var createDate = new Date().Format('yyyy-MM-dd hh:mm:ss'); //生成订单日期
			var orderId = platform + r1 + sysDate + r2; //订单id由平台码+r1,r2+生成订单时间构成
			var order = {
				orderId: orderId,
				orderTotal: orderTotal,
				addressInfo: address,
				goodsList: goodsList,
				orderStatus: '1',
				createDate: createDate
			};

			doc.orderList.push(order);

			doc.save(function(err1, doc1) {
				if (err1) {
					res.json({
						status: "1",
						msg: err.message,
						result: ''
					});
				} else {
					res.json({
						status: "0",
						msg: '',
						result: {
							orderId: order.orderId,
							orderTotal: order.orderTotal
						}
					});
				}
			});
		}
	})
});
//根据订单Id查询订单信息
router.get("/orderDetail", function (req,res,next) {
  var userId = req.cookies.userId,orderId = req.param("orderId");
  User.findOne({userId:userId}, function (err,userInfo) {
      if(err){
          res.json({
             status:'1',
             msg:err.message,
             result:''
          });
      }else{
         var orderList = userInfo.orderList;
         if(orderList.length>0){
           var orderTotal = 0;
           orderList.forEach((item)=>{
              if(item.orderId == orderId){
                orderTotal = item.orderTotal;
              }
           });
           if(orderTotal>0){
             res.json({
               status:'0',
               msg:'',
               result:{
                 orderId:orderId,
                 orderTotal:orderTotal
               }
             })
           }else{
             res.json({
               status:'120002',
               msg:'无此订单',
               result:''
             });
           }
         }else{
           res.json({
             status:'120001',
             msg:'当前用户未创建订单',
             result:''
           });
         }
      }
  })
});
module.exports = router;