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
      path: '/course',
      name: 'course',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Course.vue')
    },
    {
      path: '/create',
      name: 'create',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Create.vue')
    },
    {
      path: '/edit/:slug',
      name: 'edit',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Create.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || null)
  const requireAuth = to.matched.some(record => record.meta?.auth)
  if (!user && requireAuth) {
    return next({ name: 'login' })
  } else {
    next()
  }
})

export default router
