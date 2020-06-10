import { auth } from 'firebase/app'
import router from '@/router'

export default {
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const newUser = {
            id: res.user.uid
          }
          router.push({ name: 'Home' })
          commit('createUser', newUser)
          commit('setLoading', false)
        }).catch(err => {
          commit('setLoading', false)
          throw err
        })
    },

    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const newUser = {
            id: res.user.uid
          }
          commit('createUser', newUser)
          router.push({ name: 'Home' })
          commit('setLoading', false)
        }).catch(err => {
          commit('setLoading', false)
          throw err
        })
    },

    logout ({ commit }) {
      auth().signOut()
        .then(() => {
          commit('createUser', null)
          router.push({ name: 'Sign In' })
        })
        .catch(err => {
          commit('setLoading', false)
          throw err
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('createUser', { id: payload.uid })
    }
  }
}
