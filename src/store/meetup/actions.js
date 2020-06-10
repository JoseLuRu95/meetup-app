import firebase from 'firebase'
import router from '@/router'
import meetupTransformer from '@/transformers/meetup.js'

export default {
  actions: {
    fetchMeetups ({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups/').once('value')
        .then(data => {
          const fetchedMeetups = []
          const obj = data.val()
          for (let key in obj) {
            fetchedMeetups.push({ id: key, ...meetupTransformer.fetch(obj[key]) })
          }
          commit('setLoading', false)
          commit('setFetchedMeetups', fetchedMeetups)
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },

    fetchMeetupById ({ commit }, id) {
      commit('setLoading', true)
      firebase.database().ref('meetups/' + id).once('value')
        .then(data => {
          commit('fetchMeetup', meetupTransformer.fetch(data.val()))
          commit('setLoading', false)
        }).catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },

    createMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      let imageUrl
      let key
      const filename = payload.imgUrl.name
      const ext = filename.slice(filename.lastIndexOf('.'))
      firebase.database().ref('meetups').push(meetupTransformer.send({ ...payload, 'creatorId': getters.user.id }))
        .then(data => {
          key = data.key
          return firebase.storage().ref('meetups/' + key + ext).put(payload.imgUrl)
        })
        .then(() => {
          return firebase.storage().ref('meetups/' + key + ext).getDownloadURL()
        })
        .then((URL) => {
          imageUrl = URL
          return firebase.database().ref('meetups').child(key).update({ imgUrl: imageUrl })
        })
        .then(() => {
          router.push('/meetups')
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },

    updateMeetup ({ commit }, payload) {
      commit('setLoading', true)
      let key = payload.id
      firebase.database().ref('meetups').child(key).update(meetupTransformer.update(payload))
        .then(data => {
          if (typeof (payload.imgUrl) === 'object') {
            const filename = payload.imgUrl.name
            const ext = filename.slice(filename.lastIndexOf('.'))
            firebase.storage().ref('meetups/' + key + ext).put(payload.imgUrl)
              .then(() => {
                return firebase.storage().ref('meetups/' + key + ext).getDownloadURL()
              })
              .then((URL) => {
                return firebase.database().ref('meetups').child(key).update({ imgUrl: URL })
              })
          }
        })
        .then(() => {
          router.push('/meetups')
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    }
  }
}
