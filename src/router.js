import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/generator',
      name: 'generator',
      component: () => import('./views/Generator')
    },
    {
      path: '/activate',
      name: 'activate',
      component: () => import('./views/Activate')
    },
    {
      path: '/reset',
      name: 'resetPwd',
      component: () => import('./views/ResetPwd')
    },
    {
      path: '/',
      name: 'home',
      component: Main,
      children: [
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/About.vue')
        },
        {
          path: '/lookingfor',
          name: 'lookingfor',
          component: () => import('./views/Lookingfor.vue')
        },
        {
          path: '/info',
          name: 'info',
          component: () => import('./views/Info.vue')
        },
        {
          path: '/search',
          name: 'search',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/Search.vue')
        },
        {
          path: '/getMatch',
          name: 'getMatch',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/GetMatch.vue')
        },
        {
          path: '/matchs',
          name: 'matchs',
          component: () => import('./views/Matchs.vue')
        },
        {
          path: '*',
          name: 'getmatch',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/GetMatch.vue')
        },
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
