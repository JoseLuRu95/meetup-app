
export default {
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.time > b.time
      }).sort((a, b) => {
        return a.day > b.day
      })
    },
    fetchedMeetup (state) {
      return state.fetchedMeetup
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    }
  }
}
