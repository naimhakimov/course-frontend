import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    },
    {
      path: '/lecture/create',
      name: 'lecture-create',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Lecture/Create.vue')
    },
    {
      path: '/lecture/edit/:id',
      name: 'lecture-edit',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Lecture/Create.vue')
    },
    {
      path: '/laboratory-work',
      name: 'laboratory-work',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Laboratory-work/index.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Quiz/index.vue')
    },
    {
      path: '/quiz/create',
      name: 'quiz-create',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Quiz/Create.vue')
    },
    {
      path: '/quiz/edit/:id',
      name: 'quiz-edit',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Quiz/Create.vue')
    }, 
    {
      path: '/material',
      name: 'material',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Material/index.vue')
    }, 
    {
      path: '/material/create',
      name: 'material-create',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Material/Create.vue')
    },
    {
      path: '/material/edit/:id',
      name: 'material-edit',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Material/Create.vue')
    },
     {
      path: '/task',
      name: 'task',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Task/index.vue')
    },
    {
      path: '/task/create',
      name: 'task-create',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Task/Create.vue')
    },
    {
      path: '/task/edit/:id',
      name: 'task-edit',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Task/Create.vue')
    },
    {
      path: '/video',
      name: 'video',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Video/index.vue')
    },
    {
      path: '/video/create',
      name: 'video-create',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Video/Create.vue')
    },
    {
      path: '/video/edit/:id',
      name: 'video-edit',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Video/Create.vue')
    },
    {
      path: '',
      redirect: '/users'
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
