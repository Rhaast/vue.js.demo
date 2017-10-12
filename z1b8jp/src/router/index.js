import Vue from 'vue'
import Router from 'vue-router'
import goodsList from '@/views/goodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'


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
  },
  {
    path: '/address',
    name: 'address',
    component: Address
  }]
})