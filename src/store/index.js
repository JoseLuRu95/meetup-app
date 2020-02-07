import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setFetchedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    createUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    fetchMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          commit('setLoading', false)
          const fetchedMeetups = []
          const obj = data.val()
          for (let key in obj) {
            fetchedMeetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imgUrl: obj[key].imgUrl,
              date: {
                day: obj[key].date.day,
                time: obj[key].date.time
              }
            })
          }
          commit('setFetchedMeetups', fetchedMeetups)
        }).catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imgUrl: payload.imgUrl,
        description: payload.description,
        date: {
          day: payload.date.day,
          time: payload.date.time
        }
      }
      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          commit('createMeetup', {
            ...meetup,
            id: data.key
          })
        }).catch(err => console.log(err))
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit('setLoading', false)
          const newUser = {
            id: res.user.uid,
            registerMeetups: []
          }
          commit('createUser', newUser)
        }).catch(err => {
          commit('setLoading', false)
          commit('setError', err)
        })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit('setLoading', false)
          const newUser = {
            id: res.user.uid,
            registerMeetups: []
          }
          commit('createUser', newUser)
        }).catch(err => {
          commit('setLoading', false)
          commit('setError', err)
        })
    },
    autoSignIn ({ commit }, payload) {
      commit('createUser', { id: payload.uid, registerMeetups: [] })
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    // Make an array of sorted meetups
    loadedMeetups (state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date.time > b.date.time
      }).sort((a, b) => {
        return a.date.day > b.date.day
      })
    },
    // Make an array of only 5 meetups using loadedMeetups getter
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    // Find meetup by ID
    loadedMeetup (state) {
      return MeetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === MeetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
