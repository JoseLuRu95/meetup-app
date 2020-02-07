import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imgUrl: 'https://images7.alphacoders.com/853/853456.jpg',
        id: '1',
        title: 'Meetup in Los Santos',
        date: {
          day: '2020-01-01',
          time: '12:00'
        }
      },
      {
        imgUrl: 'https://vignette.wikia.nocookie.net/dark-souls/images/8/82/Anor_Londo_%28Dark_Souls_III%29.jpg/revision/latest?cb=20161205200358&path-prefix=es',
        id: '2',
        title: 'Meetup in Anor Londo',
        date: {
          day: '2020-01-01',
          time: '11:00'
        }
      }
    ],
    user: {
      id: '',
      registerMeetups: []
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    }
  },
  actions: {
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imgUrl: payload.imgUrl,
        description: payload.description,
        date: {
          day: payload.date.day,
          time: payload.date.time
        },
        id: '3'
      }
      // Reach out the firebase and store it
      commit('createMeetup', meetup)
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
    loadedMeetup (state) {
      return MeetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === MeetupId
        })
      }
    }
  }
})
