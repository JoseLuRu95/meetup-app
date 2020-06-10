import firebase from 'firebase'
import router from '@/router'

export default {
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const newUser = {
            id: res.user.uid
          }
          router.push('/home')
          commit('createUser', newUser)
          commit('setLoading', false)
        }).catch(err => {
          commit('setLoading', false)
          throw err
        })
    },

    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          const newUser = {
            id: res.user.uid
          }
          commit('createUser', newUser)
          router.push('/home')
          commit('setLoading', false)
        }).catch(err => {
          commit('setLoading', false)
          throw err
        })
    },

    logout ({ commit }) {
      firebase.auth().signOut()
        .then(() => commit('createUser', null))
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
