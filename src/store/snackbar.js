export default {
  state: {
    status: false,
    message: null,
  },
  mutations: {
    set_snackbar(state, payload) {
      state.status = true
      state.message = payload
      setTimeout(function () {
        state.status = false
        state.message = null
      }, 5000)
    }
  },
  actions: {
    setSnackbar({commit}, payload) {
      commit('set_snackbar', payload)
    },
    inDevelop({commit}) {
      commit('set_snackbar', 'В разработке')
    },
  },
  getters: {
    snackbarStatus: state => {
      return state.status
    },
    snackbarMessage: state => {
      return state.message
    }
  }
}