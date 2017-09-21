new Vue({
      el:'.container',//Vue实例监听范围
      data:{
          limitNum:3,
          addressList:[], //把获取到的jason地址列表储存于此
          currentIndex:0,  //选中状态索引值
          selectMethod: 1,
          delFlag:false,
          isModAddress:false,
          modName:'',
		      modStreetAddress:'',
		      modTel:'',
	        modAddId:'',
          curItem:''
      },
      mounted:function(){ //钩子函数
          this.$nextTick(function(){
              this.gainList();

          });
      },
      computed:{  //列表显示的个数
          filterAddList:function(){
              return this.addressList.slice(0,this.limitNum);
          }
      },
      methods:{   //提取数据.
        gainList:function(){
    			this.$http.get('data/address.json',{'id':456}).then(res=>{
    				this.addressList = res.data.result;
    			})
    		},
        //展开列表
        loadMore:function(){
            this.limitNum=this.addressList.length;
          },
        //设为默认
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if (address.addressId==addressId) {
                      address.isDefault = true;
                }else{
                      address.isDefault =false;
                }
            });
        },
        //删除列表
        delBtn:function(item){
			       this.delFlag = true;
			       this.curItem = item;
		  },
      //确定删除
      sureDel:function(){
        this.delFlag = false;
        var index = this.addressList.indexOf(this.curItem);
        this.addressList.splice(index,1);

      },
      //编辑地址
      modAddress:function(item){
            this.isModAddress = true;
            this.modAddId = item.addressId;
			      this.modName = item.userName;
			      this.modStreetAddress = item.streetName;
			      this.modTel = item.tel;
      },

      //确认编辑地址
      sureModAdd:function(addressId){
			this.isModAddress = false;
			this.addressList.forEach((item,index)=>{
				if(item.addressId == addressId){
					item.userName = this.modName;
					item.streetName = this.modStreetAddress;
					item.tel = this.modTel;
				}
			});
        }

      }
});
