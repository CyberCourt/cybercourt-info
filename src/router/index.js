import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component:  () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/apply',
    name: 'Apply',
    component:  () => import(/* webpackChunkName: "apply" */ '../views/Apply.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component:() => import( /* webpackChunkName: "me" */ '../views/Me.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component:() => import( /* webpackChunkName: "team" */ '../views/Team.vue')
  },
  {
    path: '/teamGovern',
    name: 'TeamGovern',
    component:() => import( /* webpackChunkName: "team" */ '../views/TeamGovern.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
