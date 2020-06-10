import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { initializeApp } from 'firebase/app'
import { auth } from 'firebase'
import Alert from '@/components/Alert.vue'

Vue.config.productionTip = false
Vue.component('app-alert', Alert)

const configOptions = {
  apiKey: 'AIzaSyBryW3WR-y7Rs4ppnvYLTag8CbCiYiY_hE',
  authDomain: 'meetups-app-ea9c9.firebaseapp.com',
  databaseURL: 'https://meetups-app-ea9c9.firebaseio.com',
  projectId: 'meetups-app-ea9c9',
  storageBucket: 'gs://meetups-app-ea9c9.appspot.com/',
  messagingSenderId: '101819390759'
}

initializeApp(configOptions)

auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('autoSignIn', user)
  }
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
