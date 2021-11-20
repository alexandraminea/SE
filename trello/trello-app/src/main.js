// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: 'AIzaSyBcSyZSV8e4ibnRvZfrkJBC07Gegj25tzY',
  authDomain: 'trello-app-f2787.firebaseapp.com',
  projectId: 'trello-app-f2787',
  storageBucket: 'trello-app-f2787.appspot.com',
  messagingSenderId: '234749269351',
  appId: '1:234749269351:web:18f216176458ab5b144bc2'
})

export const db = firebase.firestore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
