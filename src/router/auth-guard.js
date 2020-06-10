import store from '@/store'

export default (to, from, next) => {
  if (store.getters.user) {
    if (to.name === 'Sign In' || to.name === 'Sign Up') {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    if (to.name === 'Sign In' || to.name === 'Sign Up') {
      next()
    } else if (!(to.name === 'Sign In' || to.name === 'Sign Up')) {
      next({ name: 'Sign In' })
    } else {
      next()
    }
  }
}
