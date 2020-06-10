import Vue from 'vue'
import Vuex from 'vuex'

import meetup from './meetup'
import user from './user'
import handler from './handler'
import registerMeeup from './registerMeeup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetup: meetup,
    user: user,
    handler: handler,
    registerMeeup
  }
})
