import { auth } from 'firebase/app'
import router from '@/router'

export default {
  actions: {
    signUserUp ({ commit, getters }, payload) {
      commit('setLoading', true)
      auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const newUser = {
            id: res.user.uid
          }
          commit('createUser', newUser)
        })
        .catch(err => {
          commit('setError', err)
          throw err
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },

    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const newUser = {
            id: res.user.uid
          }
          commit('createUser', newUser)
        })
        .catch(err => {
          commit('setError', err)
          throw err
        })
        .finally(() => {
          commit('setLoading', false)
        })
    },

    logout ({ commit }) {
      auth()
        .signOut()
        .then(() => {
          commit('createUser', null)
          router.push({ name: 'Sign In' })
        })
        .catch(err => {
          commit('setError', err)
          throw err
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('createUser', { id: payload.uid })
    }
  }
}
