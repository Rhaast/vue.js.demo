import Vue from 'vue'
import Router from 'vue-router'
import goodsList from '@/views/goodsList'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodsList',
      component:goodsList
    }
  ]
})
