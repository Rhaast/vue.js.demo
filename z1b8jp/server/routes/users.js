var express = require('express');
var router = express.Router();


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
router.post("/cartEdit", function (req,res,next) {
  var userId = req.cookies.userId,
      productId = req.body.productId,
      productNum = req.body.productNum,
      checked = req.body.checked; //选中商品
  User.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked,
  }, function (err,doc) {
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      });
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'suc'
      });
    }
  })
});
module.exports = router;