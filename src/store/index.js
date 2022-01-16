import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import preloader from './preloader'
import snackbar from './snackbar'
import drawer from './drawer'
import clients from './clients'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    preloader,
    snackbar,
    drawer,
    clients,
  },
  plugins: [
  ]
})
