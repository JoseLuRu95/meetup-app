import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import firebase from 'firebase'
import Alert from '@/components/Alert.vue'

Vue.config.productionTip = false
Vue.component('app-alert', Alert)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBryW3WR-y7Rs4ppnvYLTag8CbCiYiY_hE',
      authDomain: 'meetups-app-ea9c9.firebaseapp.com',
      databaseURL: 'https://meetups-app-ea9c9.firebaseio.com',
      projectId: 'meetups-app-ea9c9',
      storageBucket: 'meetups-app-ea9c9.appspot.com',
      messagingSenderId: '101819390759'
    })
    this.$store.dispatch('fetchMeetups')
  }
}).$mount('#app')
