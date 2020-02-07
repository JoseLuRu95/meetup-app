import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from '@/router/auth-guard.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: () => import('@/views/Meetups/Meetups.vue')
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: () => import('@/views/Meetups/CreateMeetup.vue'),
    beforeEnter: AuthGuard
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: () => import('@/views/Meetups/Meetup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/User/Profile.vue'),
    beforeEnter: AuthGuard
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/views/User/Signin.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
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

export default router
