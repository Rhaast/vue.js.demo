import Vue from 'vue'
import Router from 'vue-router'
import goodsList from '@/views/goodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import orderConfirm from '@/views/orderConfirm'
import orderSuccess from '@/views/orderSuccess'


Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'goodsList',
    component: goodsList
  }, {
    path: '/cart',
    name: 'cart',
    component: Cart
  }, {
    path: '/address',
    name: 'address',
    component: Address
  }, {
    path: '/orderConfirm',
    name: 'orderConfirm',
    component: orderConfirm
  },{
    path: '/orderSuccess',
    name: 'orderSuccess',
    component: orderSuccess
  }]
})