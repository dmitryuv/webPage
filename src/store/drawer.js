export default {
  state: {
    status: false,
    title: null,
    device: null,
    dialog: 0,
    wifi_selected_network: null,
  },
  mutations: {
    showDrawer(state, device) {
      state.device = device
      state.title = device['config']['name']
      state.status = true
      state.dialog = 0
      state.wifi_selected_network = null
    },
    hideDrawer(state) {
      state.title = null
      state.device = null
      state.status = false
      state.dialog = 0
      state.wifi_selected_network = null
    },
    changeDrawerTitle(state, name) {
      state.title = name
    },
    changeDrawerDevice(state, payload) {
      state.device[payload['param']] = payload['value']
    },
    changeDrawerDialog(state, dialog) {
      state.dialog = dialog
    },
    changeDrawerWfsn(state, index) {
      state.wifi_selected_network = index
    },
  },
  actions: {
    showDrawer({commit}, payload) {
      commit('showDrawer', payload)
    },
    hideDrawer({commit}) {
      commit('hideDrawer')
    },
    toggleDrawer({state, commit}, payload) {
      if (state.status) {
        commit('hideDrawer')
      } else {
        commit('showDrawer', payload)
      }
    },
    changeDrawerTitle({commit}, payload) {
      commit('changeDrawerTitle', payload)
    },
    changeDrawerDialog({commit}, payload) {
      commit('changeDrawerDialog', payload[0])
      commit('changeDrawerTitle', payload[1])
    },
    changeDrawerWfsn({commit}, payload) {
      commit('changeDrawerWfsn', payload[0])
      commit('changeDrawerTitle', payload[1])
    }
  },
  getters: {
    getDrawerStatus: state => {
      return state.status
    },
    getDrawerTitle: state => {
      return state.title
    },
    getDrawerDevice: state => {
      return state.device
    },
    getDrawerDialog: state => {
      return state.dialog
    },
    getDrawerWfsn: state => {
      return state.wifi_selected_network
    },
  }
}