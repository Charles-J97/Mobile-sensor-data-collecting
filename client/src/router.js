import Vue from 'vue'
import Router from 'vue-router'

import Welcome from './views/Welcome.vue'
import Enter from './views/Index.vue'
import Thanks from './views/Thanks.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Info from './views/Info.vue'
import Initial from './views/Initial.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'initial',
      component: Initial
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: Enter
    },
    {
      path: '/thanks',
      name: 'thanks',
      component: Thanks
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/initial',
      name: 'initial',
      component: Initial
    }
  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register' || to.path === '/initial') {
    next()
  } else {
    (localStorage.eleToken) ? next() : next('/initial')
  }
})

export default router
