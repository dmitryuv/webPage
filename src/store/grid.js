export default {
  state: {
    types_grid: [
      {"x": 0, "y": 0, "w": 2, "h": 1, i: 0, type: 'thermostat'},
      {"x": 0, "y": 1, "w": 2, "h": 2, i: 1, type: 'conditioner'},
      {"x": 2, "y": 0, "w": 1, "h": 1, i: 2, type: 'sensor'},
      {"x": 2, "y": 1, "w": 1, "h": 1, i: 3, type: 'switcher'},
    ],
    devices_grid: [],
    panel_grid: [],
    panel_presets: [
      {
        type: 1,
        grid: [
          {y: 0, x: 0, h: 2, w: 3, i: 1, devices: ['thermostat', 'conditioner']},
          {y: 2, x: 0, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
          {y: 2, x: 1, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
          {y: 2, x: 2, h: 1, w: 1, i: 4, devices: ['sensor', 'switcher']}
        ]
      },
      {
        type: 2,
        grid: [
          {y: 0, x: 0, h: 2, w: 2, i: 1, devices: ['thermostat', 'conditioner']},
          {y: 0, x: 2, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
          {y: 1, x: 2, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
          {y: 2, x: 0, h: 1, w: 1, i: 4, devices: ['sensor', 'switcher']},
          {y: 2, x: 1, h: 1, w: 1, i: 5, devices: ['sensor', 'switcher']},
          {y: 2, x: 2, h: 1, w: 1, i: 6, devices: ['sensor', 'switcher']},
        ]
      },
      {
        type: 3,
        grid: [
          {y: 0, x: 0, h: 2, w: 2, i: 1, devices: ['thermostat', 'conditioner']},
          {y: 0, x: 2, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
          {y: 1, x: 2, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
          {y: 2, x: 0, h: 1, w: 3, i: 4, devices: ['switcher']},
        ]
      },
      {
        type: 4,
        grid: [
          {y: 0, x: 0, h: 2, w: 2, i: 1, devices: ['thermostat', 'conditioner']},
          {y: 0, x: 2, h: 1, w: 1, i: 2, devices: ['sensor', 'switcher']},
          {y: 1, x: 2, h: 1, w: 1, i: 3, devices: ['sensor', 'switcher']},
          {y: 2, x: 0, h: 1, w: 2, i: 4, devices: ['switcher']},
          {y: 2, x: 2, h: 1, w: 1, i: 5, devices: ['sensor', 'switcher']},
        ]
      },
      {
        type: 5,
        grid: [
          {y: 0, x: 0, h: 1, w: 3, i: 1, devices: ['switcher']},
          {y: 1, x: 0, h: 1, w: 3, i: 2, devices: ['switcher']},
          {y: 2, x: 0, h: 1, w: 3, i: 3, devices: ['switcher']},
        ]
      },
      {
        type: 6,
        grid: [
          {y: 0, x: 0, h: 3, w: 3, i: 1, devices: ['switcher']},
        ]
      },
    ]
  },
  mutations: {
    set_size(state, payload) {
      state.size_devices = payload
    },
    clear_devices_grid(state) {
      state.devices_grid = []
    },
    add_devices_grid(state, payload) {
      state.devices_grid.push(payload)
    },
    update_grid(state, payload) {
      state.panel_grid = payload
    }
  },
  actions: {
    setDevicesGrid({commit, rootGetters}, payload) {
      commit('set_size', payload.size)
      commit('clear_devices_grid')

      console.log(payload.type)

      if (['thermostat', 'conditioner'].indexOf(payload.type) >= 0) {
        let i = 0
        for (let device of rootGetters.getThermostats) {
          if (payload.type === 'thermostat' && ['esp8266_thermostat', 'esp8266_thermostat_plus', 'esp32_panel_4inch'].indexOf(device.type) >= 0) {
            commit('add_devices_grid', {x: 0, y: 0, w: 2, h: 1, i: i, type: 'thermostat', device: device})
            i++
          }
          if (payload.type === 'conditioner' && ['esp8266_air'].indexOf(device.type) >= 0) {
            commit('add_devices_grid', {x: 0, y: 0, w: 2, h: 2, i: i, type: 'conditioner', device: device})
            i++
          }
        }
      }

      if (payload.type === 'sensor') {
        let i = 0
        let x = 0
        for (let device of rootGetters.getSensors) {
          if (x == 3)
            x = 0
          commit('add_devices_grid', {x: x, y: 0, w: 1, h: 1, i: i, type: 'sensor', device: device})
          i++;
          x++;
        }
      }
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
    getPanelPresets: state => {
      return state.panel_presets
    },
    getPanelGrid: state => {
      return state.panel_grid
    },
    getFormattedPanelGrid: state => {
      let data = []

      for (let panel of state.panel_grid) {
        let cells = {
          type: panel.type,
          grid: [],
        }
        for (let cell of panel.grid) {
          if (cell.device) {
            cells.grid.push({cell: cell.i, id: cell.device.dev_id})
          }
        }
        data.push(cells)
      }

      return data
    },
  }
}