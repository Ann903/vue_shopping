import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 自動重定向，跳轉到登錄頁面
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 挂载路由导航守卫  beforEach
router.beforeEach((to, from, next) => {
  // to代表将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数，表示放行，可以强制跳转

  // 判断用户访问的是不是登录页，如果是就直接放行
  if (to.path === '/login') return next()
  // 不是登录页就获取token
  const tokenStr = window.sessionStorage.getItem('token')
  // 强制跳转到登录页next('/login')
  if (!tokenStr) return next('/login')
  next()
})

export default router
