export default {
  state: {
    status: false,
    page: 0
  },
  mutations: {
    showSettings(state) {
      state.page = 0
      state.status = true
    },
    hideSettings(state) {
      state.status = false
    },
    setPage(state, page) {
      state.page = page
    }
  },
  actions: {
    showSettings({commit}) {
      commit('showSettings')
    },
    hideSettings({commit}) {
      commit('hideSettings')
    },
    setSettingsPage({commit}, page) {
      commit('setPage', page)
    }
  },
  getters: {
    getSettingsVisible: state => {
      return state.status
    },
    getSettingsPage: state => {
      return state.page
    }
  }
}