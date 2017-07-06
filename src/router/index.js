import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/View/Home/index'
import Info from '@/View/Info/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    }
  ]
})
