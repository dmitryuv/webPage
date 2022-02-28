export default {
  state: {
    status: 0
  },
  mutations: {
    set_preloader(state, payload) {
      if (payload)
        state.status++
      else
        state.status--
    },
    set_reload_timer(state, time) {
      state.status++
      setTimeout(() => {
        location.reload()
      }, time * 1000)
    }
  },
  actions: {
    setPreloader({commit}, payload) {
      commit('set_preloader', payload)
    }
  },
  getters: {
    preloaderStatus: state => {
      return state.status > 0
    }
  }
}