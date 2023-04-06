import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { layout: 'main', auth: true }
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty', auth: false },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/users',
      name: 'users',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Users/index.vue')
    },
    {
      path: '/lecture',
      name: 'lecture',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Lecture/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const requireAuth = to.matched.some(record => record.meta?.auth)
  if (!user && requireAuth) {
    return next({ name: 'login' })
  } else {
    next()
  }
})

export default router
