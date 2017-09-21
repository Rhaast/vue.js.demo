var vm = new Vue({
    el:"#app",
    data:{
        totalMoney:0,//总金额
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''

    },
    //过滤器
    filters:{
        formatMoney: function(value){
            return "$"+value.toFixed(2);  //返回的货币符号，toFixed代表小数位数。

        }
    },

    mounted:function(){
        this.$nextTick(function(){
          vm.cartView();

        });
    },

    methods:{
          cartView:function(){
              let _this = this;
              //Vue.source插件，目前已经被axios代替
              vm.$http.get('data/cartData.json').then(res=>{
  				      this.productList = res.data.result.list;
        			  this.totalMoney = res.data.result.totalMoney;
        			});
          },
          // 增加或减少商品数量改变总金额
          changeMoney:function(item,type){
        			if(type<0){
        				item.productQuantity--;
        				if(item.productQuantity<1){
        					item.productQuantity = 1;
        				}
        			}else{
        				item.productQuantity++;
        			}
        			//计算总金额
        			this.calTotalMoney();
        		},

         //选中商品
         selectedProduct:function(item){
              if(typeof item.checked == 'undefined'){
                Vue.set(item,"checked",true);//全局注册一个选中的API
                // this.$set(item,"checked",true);局部注册的方法
              }else{
                item.checked = !item.checked;
              }
              this.calTotalMoney();
         },
         //全选
         checkAll:function(flag){
              this.checkAllFlag = flag;
              var _this = this;
              this.productList.forEach(function(item,index){
                  if(typeof item.checked == 'undefined'){
                      _this.$set(item,"checked",_this.checkAllFlag);
                  }else{
                      item.checked = _this.checkAllFlag;
                  }
              });
              this.calTotalMoney();
         },
         //计算总金额
         calTotalMoney:function(){
         			this.totalMoney = 0;//总金额清0，不然会导致累加的情况出现
         			this.productList.forEach((item,index)=>{
         				if(item.checked){
         					this.totalMoney += item.productPrice*item.productQuantity;
         				}
         			})
         		},
          //删除商品
          sureDel:function(item){
          			this.delFlag = true;
          			this.curProduct = item;
          		},
          		//确定删除
          		delProduct:function(){
          			this.delFlag = false;
          			var index = this.productList.indexOf(this.curProduct);
          			this.productList.splice(index,1);
          			//计算总金额
          			this.calTotalMoney();
          		}
    }

});
// Vue.filter();全局过滤器定义
Vue.filter("money",function(value,type){
    return "$"+value.toFixed(2) +type;
})
