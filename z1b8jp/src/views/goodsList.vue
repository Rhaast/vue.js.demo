<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
        <span slot="bread">goods</span>
        <span slot = "B">nimasl</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods">Price 
          <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <!-- v-bind:class增加响应式缩小后的侧边栏样式，并设置filterBy参数，true为显示，false为隐藏 -->
          <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
               <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <!-- 调用模态框 -->
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
          <p slot="message">
             请先登录,否则无法加入到购物车中!
          </p>
          <div slot="btnGroup">
              <a class="btn btn--m" href="javascript:;" @click="mdShow = false">关闭</a>
          </div>
      </modal>
      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>穷逼，你觉得你买得起么？</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="closeModal()">有本事再说一遍</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">放弃购买</router-link>
        </div>
      </modal>
       <modal v-bind:mdShow="mdShowCart1" v-on:close="closeModal1">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>再说一遍又如何，nmsl</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="closeModal1()">老子有的是钱</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">放弃购买</router-link>
        </div>
      </modal>
            <modal v-bind:mdShow="mdShowCart2" v-on:close="closeModal2">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>呵呵</span>
        </p>
        <div slot="btnGroup">
          <a class="btn btn--m" href="javascript:;" @click="closeModal2">呵呵你妈</a>
          <router-link class="btn btn--m btn--red" href="javascript:;" to="/cart">放弃购买</router-link>
        </div>
      </modal>
    <nav-footer></nav-footer>

  </div>
</template>
<style type="text/css">
  .list-warp ul::after{
     clear: both;
     content: "";
     height: 0;
     display: block;
     visibility: hidden;
  }
  .load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;

  }
  .btn:hover{
    background-color: #ffe5e6;
    transition: all .3s ease-out;
  }
</style>
<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import Modal from '@/components/Modal.vue'
import axios from 'axios'
export default {
      data(){
         return{
           goodsList:[],
           sortFlag:true,   //排序
           page:1,    //页数
           pageSize:8,    //每页显示条数
           priceFilter:[
                { startPrice:'0.00',
                  endPrice:'500.00'
              },{ startPrice:'500.00',
                  endPrice:'1000.00'
              },{ startPrice:'1000.00',
                  endPrice:'2000.00'
              }
           ],
           priceChecked:'all',
           filterBy:false,     //价格
           overLayFlag:false,    //遮罩
           busy: true,    //busy代表是否禁用滚动
           loading:false,
           mdShow:false,
           mdShowCart:false,
           mdShowCart1:false,
           mdShowCart2:false   
         }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread,
        Modal
      },
      mounted:function(){
        this.getGoodsList();
      },
      methods:{
          getGoodsList(flag){
               var param = {
                  page:this.page,
                  pageSize:this.pageSize,
                  sort:this.sortFlag?1:-1,//升
                  priceLevel:this.priceChecked

               }
               this.loading = true;
               axios.get("/goods/list",{
                params:param
               }).then((result)=>{
                  let res = result.data;
                  this.loading = false;
                  if(res.status=="0"){
                    if(flag){
                      this.goodsList = this.goodsList.concat(res.result.list);   //滚动加载下一页

                      if(res.result.count==0){      //如果剩余加载数为0.则禁止滚动
                            this.busy = true;
                      }else{
                            this.busy = false;
                      }
                    }else{
                      this.goodsList = res.result.list;
                      this.busy = false;
                    }
                    
                  }else{
                    this.goodsList = [];
                  }
                  
               });
          },
          showFilterPop(){                               //打开侧边栏和遮罩
            this.filterBy = true;
            this.overLayFlag = true
          },
          setPriceFilter(index){                        //定义setPriceFilter,点击某一项价格关闭遮罩和侧边栏
            this.priceChecked = index;
            this.closePop();
            this.page = 1;
            this.getGoodsList();


          },
          closePop(){                                   //点击遮罩层关闭侧边栏和遮罩层
            this.filterBy = false;
            this.overLayFlag = false
          },
          sortGoods(){           //排序：升序和降序
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList();
          },

          loadMore: function() {                      //滚动加载
            this.busy = true;
            setTimeout(() => {
               this.page++;
               this.getGoodsList(true);
           }, 1000);
        },
            addCart(productId){
                axios.post("/goods/addCart",{
                  productId:productId
                }).then((res)=>{
                    var res = res.data;
                    if(res.status==0){
                        this.mdShowCart = true;
                        this.$store.commit("updateCartCount",1);    //加入购物车
                    }else{
                        this.mdShow = true;
                    }
                });
            },
          closeModal(){
             this.mdShow = false;       //关闭模态框
             this.mdShowCart = false;
             this.mdShowCart1 = true;
          },
              closeModal1(){
             this.mdShowCart1 = false;
             this.mdShowCart2 = true;
          },      closeModal2(){

             this.mdShowCart2 = false;
          }
    }
}
</script>
