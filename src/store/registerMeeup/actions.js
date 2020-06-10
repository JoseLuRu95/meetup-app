import { database } from 'firebase/app'

export default {
  actions: {
    registerUser ({ commit, getters }, meetup) {
      const user = getters.user
      database().ref('meetups').child(meetup).child('/users/').push(user)
        .then()
        .catch(err => {
          throw err
        })
    },

    unregisterUser ({ commit, getters }, [meetup, idRegister]) {
      database().ref('meetups').child(meetup).child('/users/' + idRegister).remove()
        .then()
        .catch(err => {
          throw err
        })
    }
  }
}
