
export default {
  mutations: {
    setFetchedMeetups (state, payload) {
      state.loadedMeetups = [...payload]
    },
    fetchMeetup (state, payload) {
      state.fetchedMeetup = { ...payload }
    }
  }
}
