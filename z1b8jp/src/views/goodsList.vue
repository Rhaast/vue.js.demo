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
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
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
                    <a href="#"><img v-lazy="'/static/'+item.prodcutImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.prodcutPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>

  </div>
</template>

<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import './../assets/css/login.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import axios from 'axios'
export default {
      data(){
         return{
           goodsList:[],
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
           overLayFlag:false     //遮罩
         }
      },
      components:{
        NavHeader,
        NavFooter,
        NavBread
      },
      mounted:function(){
        this.getGoodsList();
      },
      methods:{
          getGoodsList(){
               axios.get("/goods").then((result)=>{
                  var res = result.data;
                  this.goodsList = res.result;
               });
          },
          showFilterPop(){                               //打开侧边栏和遮罩
            this.filterBy = true;
            this.overLayFlag = true
          },
          setPriceFilter(index){                        //定义setPriceFilter,点击某一项价格关闭遮罩和侧边栏
            this.priceChecked = index;
            this.closePop();


          },
          closePop(){                                   //点击遮罩层关闭侧边栏和遮罩层
            this.filterBy = false;
            this.overLayFlag = false
          }

    }
}
</script>
