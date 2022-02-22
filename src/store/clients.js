// const devmode = location.hostname === 'localhost';
// const current_ip = devmode ? '192.168.1.218' : location.host;

const available_types = [
  'esp8266_thermostat',
  'esp8266_thermostat_plus',
  'esp8266_air',
  'airconditioner',
  'esp32_panel_4inch',
]
const type_params = {
  'esp8266_thermostat': ['config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'],
  'esp8266_thermostat_plus': ['config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'],
  'esp8266_air': ['config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'],
  'airconditioner': ['config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'],
  'esp32_panel_4inch': [
    'config',
    'config_1ch',
    'config_2ch',
    'mqtt_topics',
    'mqtt_topics_1ch',
    'mqtt_topics_2ch',
    'zigbee',
    'zigbee_data',
    'mqtt',
    'mqtt_data',
    'update_1ch',
    'update_2ch',
    'wifi_networks',
    'update_status',
    'qr_hk',
    'loading',
    'refresh',
  ],
}

export default {
  state: {
    sockets: {},
    clients: {},
    error: null,
  },
  mutations: {
    createClient(state, payload) {
      if (state.sockets[payload['id']] === undefined) {
        state.sockets[payload['id']] = new WebSocket('ws://' + payload['ip'] + '/ws')
      }
      let client = {
        ['id']: payload['id'],
        ['type']: payload['type'],
        ['ip']: payload['ip']
      }
      for (let param of type_params[payload['type']]) {
        client[param] = null
      }

      state.clients = {
        ...state.clients,
        [payload['id']]: {...client}
      }
    },
    updateClient(state, payload) {
      state.clients[payload['id']][payload['param']] = payload['value']
    },
    deleteClient(state, id) {
      delete state.clients[id]
      delete state.sockets[id]
    }
  },
  actions: {
    startConnect({dispatch}) {
      dispatch('clients_connect')
    },
    clients_connect({rootGetters, state, dispatch}) {
      setInterval(() => rootGetters.getSsdp.forEach(function (val) {
        if (state.clients[val.id] === undefined && available_types.indexOf(val.type) >= 0) {
          dispatch('socket_connect', val);
        }
      }), 1000);
    },
    socket_connect({rootState, state, commit, dispatch, getters}, ssdp_item) {
      let id = ssdp_item.id

      if (state.clients[id] === undefined) {
        commit('createClient', ssdp_item)
      }

      state.sockets[id].onopen = function () {
        commit('updateClient', {id: id, param: 'status', value: true})
        console.log('Соединение с ' + id + ' установлено.');
      };

      state.sockets[id].onclose = function (event) {
        if (event.wasClean) {
          console.log('Контроллер ' + id + '  отключился');
        } else {
          console.log('Обрыв соединения с ' + id);
        }
        commit('deleteClient', id)
        commit('hideDrawer')
      };

      state.sockets[id].onerror = function (error) {
        console.log('Ошибка соединения с ' + id + ' | ' + error);
        commit('deleteClient', id)
      };

      state.sockets[id].onmessage = function (event) {
        if (IsJsonString(event.data)) {
          let mess = JSON.parse(event.data);
          let param = Object.keys(mess)[0]
          Object.keys(mess).forEach(function (k) {
            let v = mess[k];
            console.log('Получен ' + param + ' c ' + id);
            if (getters.mkLoad(id)) {
              commit('updateClient', {id: id, param: 'data_loaded', value: true})
            }
            if (type_params[state.clients[id]['type']].indexOf(k) >= 0) {
              commit('updateClient', {id: id, param: k, value: v})

              let drawer_device = rootState.drawer.device;
              if (drawer_device) {
                let dd_id = drawer_device['id'].toString()
                if (dd_id.indexOf('_') > 0) {
                  let s = dd_id.split('_')
                  dd_id = s[0]
                }
                if (dd_id === id.toString()) {
                  if (['update_1ch', 'update_2ch'].indexOf(k) >= 0) {
                    k = 'update'
                  }
                  commit('changeDrawerDevice', {param: k, value: v})
                }
              }
            }
          });
        } else {
          console.log('Не правильный JSON');
          console.log(event.data);
        }
      };
    },
    socketSend({state}, payload) {
      let id = payload.id
      if (id.indexOf('_') > 0) {
        let s = id.split('_')
        id = s[0]
      }
      state.sockets[id].send(payload.mess)
    }
  },
  getters: {
    mkLoad: state => {
      return function (id) {
        if (state.clients[id]['type'] === 'esp32_panel_4inch') {
          return state.clients[id]['update_1ch'] && state.clients[id]['config'] && state.clients[id]['config_1ch'];
        } else {
          return state.clients[id]['update'] && state.clients[id]['config'];
        }
      };
    },
    getClients: state => {
      return state.clients
    },
    getSensors: (state, getters) => {
      let sensors = []
      for (let id in state.clients) {
        if (state.clients[id]['type'] === 'esp32_panel_4inch' && getters.mkLoad(id)) {
          for (let item in state.clients[id]['zigbee_data']) {
            let dev = state.clients[id]['zigbee_data'][item]
            for (let i in dev['type']) {
              sensors.push({
                'id': dev['ShotAddr'] + '_' + i,
                'type': dev['type'][i],
                'value': dev['data'][i],
                'unit': dev['unit'][i],
              })
            }
          }
        }
      }

      return sensors
    },
    getThermostats: (state, getters) => {
      let devices = []
      for (let id in state.clients) {
        if (available_types.indexOf(state.clients[id]['type']) >= 0 && getters.mkLoad(id)) {
          if (state.clients[id]['type'] === 'esp32_panel_4inch') {
            if (state.clients[id]['config_1ch']['type'] === 'thermostat') {
              devices.push({
                'id': id + '_1',
                'ch': '_1ch',
                'client': state.sockets[id],
                'type': state.clients[id]['type'],
                'ip': state.clients[id]['ip'],
                'config': state.clients[id]['config'],
                'config_ch': state.clients[id]['config_1ch'],
                'mqtt_topics': state.clients[id]['mqtt_topics'],
                'mqtt_topics_ch': state.clients[id]['mqtt_topics_1ch'],
                'zigbee': state.clients[id]['zigbee'],
                'zigbee_data': state.clients[id]['zigbee_data'],
                'mqtt': state.clients[id]['mqtt'],
                'mqtt_data': state.clients[id]['mqtt_data'],
                'update': state.clients[id]['update_1ch'],
                'wifi_networks': state.clients[id]['wifi_networks'],
                'update_status': state.clients[id]['update_status'],
                'qr_hk': state.clients[id]['qr_hk'],
                'loading': state.clients[id]['loading'],
                'refresh': state.clients[id]['refresh'],
              })
            }
            if (state.clients[id]['config_2ch']['type'] === 'thermostat') {
              devices.push({
                'id': id + '_2',
                'ch': '_2ch',
                'client': state.sockets[id],
                'type': state.clients[id]['type'],
                'ip': state.clients[id]['ip'],
                'config': state.clients[id]['config'],
                'config_ch': state.clients[id]['config_2ch'],
                'mqtt_topics': state.clients[id]['mqtt_topics'],
                'mqtt_topics_ch': state.clients[id]['mqtt_topics_2ch'],
                'zigbee': state.clients[id]['zigbee'],
                'zigbee_data': state.clients[id]['zigbee_data'],
                'mqtt': state.clients[id]['mqtt'],
                'mqtt_data': state.clients[id]['mqtt_data'],
                'update': state.clients[id]['update_2ch'],
                'wifi_networks': state.clients[id]['wifi_networks'],
                'update_status': state.clients[id]['update_status'],
                'qr_hk': state.clients[id]['qr_hk'],
                'loading': state.clients[id]['loading'],
                'refresh': state.clients[id]['refresh'],
              })
            }
          } else {
            devices.push(state.clients[id])
          }
        }
      }
      return devices
    }
  }
}

/**
 * @return {boolean}
 */
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
