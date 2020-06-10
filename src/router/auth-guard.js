import store from '@/store'

export default (to, from, next) => {
  if (store.getters.user) {
    if (to.name === 'Sign In' || to.name === 'Sign Up' || to.path === '/') {
      return next({ name: 'Home' })
    } else {
      return next()
    }
  }
  return next('/signin')
}
