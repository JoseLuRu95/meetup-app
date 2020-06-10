import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from '@/router/auth-guard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      icon: 'fas fa-users',
      showOnDrawer: false
    },
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/meetups',
    name: 'Meetups',
    meta: {
      icon: 'fas fa-users',
      showOnDrawer: true
    },
    component: () => import('@/views/Meetups/Meetups.vue')
  },
  {
    path: '/meetup/new',
    name: 'Create Meetup',
    meta: {
      icon: 'fas fa-plus',
      showOnDrawer: true
    },
    component: () => import('@/views/Meetups/CreateMeetup.vue')
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    meta: {
      icon: 'fas fa-plus',
      showOnDrawer: false
    },
    component: () => import('@/views/Meetups/Meetup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      icon: 'fas fa-user',
      showOnDrawer: true
    },
    component: () => import('@/views/User/Profile.vue')
  },
  {
    path: '/signin',
    name: 'Sign In',
    meta: {
      icon: 'fas fa-sign-in-alt',
      showOnDrawer: true
    },
    component: () => import('@/views/User/Signin.vue')
  },
  {
    path: '/signup',
    name: 'Sign Up',
    meta: {
      icon: 'far fa-user',
      showOnDrawer: true
    },
    component: () => import('@/views/User/Signup.vue')
  },
  {
    path: '*',
    name: 'Page404',
    component: () => import('@/views/Page404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    AuthGuard()
  } else {
    return next()
  }
})

export default router
