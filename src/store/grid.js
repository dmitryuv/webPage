export default {
  state: {
    types_grid: {
      sensors: [
        {"x": 0, "y": 0, "w": 1, "h": 1, i: 0, type: 'sensor'},
      ],
      switchers: [
        {"x": 0, "y": 0, "w": 1, "h": 1, i: 0, type: 'switcher'},
      ],
      thermostats: [
        {"x": 0, "y": 1, "w": 2, "h": 1, i: 1, type: 'thermostat'},
        {"x": 0, "y": 2, "w": 2, "h": 2, i: 2, type: 'conditioner'},
      ]
    },
    devices_grid: [
      // {x: 0, y: 0, w: 1, h: 1, i: 123, device: {id: 123, type: 'switcher'}},
      // {x: 1, y: 0, w: 1, h: 1, i: 1233, device: {id: 1233, type: 'switcher'}},
      // {x: 2, y: 0, w: 1, h: 1, i: 12333, device: {id: 12333, type: 'switcher'}},
      // {x: 0, y: 1, w: 2, h: 1, i: 234, device: {id: 234, type: 'thermostat'}},
      // {x: 0, y: 2, w: 2, h: 2, i: 345, device: {id: 345, type: 'conditioner'}},
    ],
    panel_grid: [],
    panel_presets: [
      [
        {y: 0, x: 0, h: 2, w: 3, i: 1, devices: ['thermostat', 'conditioner']},
        {y: 2, x: 0, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
        {y: 2, x: 1, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
        {y: 2, x: 2, h: 1, w: 1, i: 4, devices: ['sensor', 'switcher']},
      ],
      [
        {y: 0, x: 0, h: 2, w: 2, i: 1, devices: ['thermostat', 'conditioner']},
        {y: 0, x: 2, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
        {y: 1, x: 2, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
        {y: 2, x: 0, h: 1, w: 1, i: 4, devices: ['sensor', 'switcher']},
        {y: 2, x: 1, h: 1, w: 1, i: 5, devices: ['sensor', 'switcher']},
        {y: 2, x: 2, h: 1, w: 1, i: 6, devices: ['sensor', 'switcher']},
      ],
      [
        {y: 0, x: 0, h: 2, w: 2, i: 1, devices: ['thermostat', 'conditioner']},
        {y: 0, x: 2, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
        {y: 1, x: 2, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
        {y: 2, x: 0, h: 1, w: 3, i: 4, devices: ['switcher']},
      ],
      [
        {y: 0, x: 0, h: 2, w: 2, i: 1, devices: ['thermostat', 'conditioner']},
        {y: 0, x: 2, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
        {y: 1, x: 2, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
        {y: 2, x: 0, h: 1, w: 2, i: 4, devices: ['switcher']},
        {y: 2, x: 2, h: 1, w: 1, i: 5, devices: ['sensor', 'switcher']},
      ],
      [
        {y: 0, x: 0, h: 1, w: 3, i: 1, devices: ['switcher']},
        {y: 1, x: 0, h: 1, w: 3, i: 2, devices: ['switcher']},
        {y: 2, x: 0, h: 1, w: 3, i: 3, devices: ['switcher']},
      ],
      [
        {y: 0, x: 0, h: 3, w: 3, i: 1, devices: ['switcher']},
      ],
    ]
  },
  mutations: {
    set_size(state, payload) {
      state.size_devices = payload
    }
  },
  actions: {
    setDevicesGrid({commit, rootGetters}, payload) {
      commit('set_size', payload.size)

      console.log(payload.type)
      // console.log(rootGetters)
    },
  },
  getters: {
    getTypesGrid: state => {
      return state.types_grid
    },
    getSelectedType: state => {
      return state.selected_type
    },
    getDevicesGrid: state => {
      return state.devices_grid
    },
    getPanelGrid: state => {
      return state.panel_grid
    },
    getPanelPresets: state => {
      return state.panel_presets
    },
  }
}