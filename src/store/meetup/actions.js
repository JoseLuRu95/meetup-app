import { database, storage } from 'firebase/app'
import router from '@/router'
import meetupTransformer from '@/transformers/meetup.js'

export default {
  actions: {
    fetchMeetups ({ commit, getters }) {
      const user = getters.user
      if (user) {
        commit('setLoading', true)
        database().ref('meetups/').once('value')
          .then(data => {
            const fetchedMeetups = []
            const obj = data.val()
            for (let key in obj) {
              fetchedMeetups.push({ id: key, ...meetupTransformer.fetch(obj[key]) })
            }
            commit('setLoading', false)
            commit('setFetchedMeetups', fetchedMeetups)
          }).catch(err => {
            commit('setLoading', false)
            throw err
          })
      }
    },

    fetchMeetupById ({ commit, getters }, id) {
      const user = getters.user
      if (user) {
        commit('setLoading', true)
        database().ref('meetups/' + id).once('value')
          .then(data => {
            commit('fetchMeetup', meetupTransformer.fetch(data.val()))
            commit('setLoading', false)
          }).catch(err => {
            commit('setLoading', false)
            throw err
          })
      }
    },

    createMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      let imageUrl
      let key
      const filename = payload.imgUrl.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      database().ref('meetups').push(meetupTransformer.send({ ...payload, 'creatorId': getters.user.id }))
        .then(data => {
          key = data.key
          return storage().ref('meetups/' + key + ext).put(payload.imgUrl)
        })
        .then(() => {
          return storage().ref('meetups/' + key + ext).getDownloadURL()
        })
        .then((URL) => {
          imageUrl = URL
          return database().ref('meetups').child(key).update({ imgUrl: imageUrl })
        })
        .then(() => {
          router.push('/meetups')
        })
        .catch(err => {
          commit('setLoading', false)
          throw err
        })
    },

    updateMeetup ({ commit }, payload) {
      commit('setLoading', true)
      let key = payload.id
      database().ref('meetups').child(key).update(meetupTransformer.update(payload))
        .then(data => {
          if (typeof (payload.imgUrl) === 'object') {
            const filename = payload.imgUrl.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            storage().ref('meetups/' + key + ext).put(payload.imgUrl)
              .then(() => {
                return storage().ref('meetups/' + key + ext).getDownloadURL()
              })
              .then((URL) => {
                return database().ref('meetups').child(key).update({ imgUrl: URL })
              })
          }
        })
        .then(() => {
          router.push('/meetups')
        })
        .catch(err => {
          commit('setLoading', false)
          throw err
        })
    }
  }
}
