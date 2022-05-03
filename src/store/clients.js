const axios = require('axios').default;
const devmode = location.hostname === 'localhost';
const current_ip = devmode ? '192.168.1.91' : location.host;

const available_types = [
  'esp8266_thermostat',
  'esp8266_thermostat_plus',
  'esp8266_air',
  'esp32_panel_4inch',
]
const type_params = {
  'esp8266_thermostat': ['ssdp', 'config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'],
  'esp8266_thermostat_plus': ['ssdp', 'config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'],
  'esp8266_air': ['ssdp', 'config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'],
  'esp32_panel_4inch': [
    'ssdp',
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
    ssdp: null,
    current_client: null,
    clients: {},
    error: null,
  },
  mutations: {
    setSsdp(state, payload) {
      state.ssdp = payload
    },
    updateSsdp(state, ssdp) {
      for (let item of ssdp) {
        let isset = false
        for (let ssdp_item of state.ssdp) {
          if (ssdp_item['id'] === item['id'] || ssdp_item['ip'] === item['ip']) {
            isset = true
          }
        }
        if (!isset) {
          state.ssdp.push(item)
        }
      }

      console.log('===================')
      console.log('Updated SSDP:')
      for (let ssdp_item of state.ssdp) {
        console.log(ssdp_item['id'], ssdp_item['ip'], ssdp_item['type'])
      }
      console.log('===================')
    },

    createClient(state, payload) {
      let client = {
        ['client']: new WebSocket('ws://' + payload['ip'] + '/ws'),
        ['id']: payload['id'],
        ['dev_id']: payload['id'],
        ['type']: payload['type'],
        ['ip']: payload['ip'],
        ['last_data']: Math.round(new Date().getTime()/1000)
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
      if (payload['param'] === 'update_ststus' && payload['value'] === '100') {
        location.reload()
      }
    },
    deleteClient(state, id) {
      delete state.clients[id]
    }
  },
  actions: {
    startConnect({dispatch, commit}) {
      // dispatch('socket_current_connect');

      axios.get('http://' + current_ip + '/ssdp.json')
        .then(function (response) {
          commit('setSsdp', response.data.ssdp)
          dispatch('clients_connect')
        })
        .catch(function (error) {
          console.log(error);
        })
      setInterval(() => {
        // dispatch('socket_current_connect');
        axios.get('http://' + current_ip + '/ssdp.json')
          .then(function (response) {
            commit('setSsdp', response.data.ssdp)
          })
          .catch(function (error) {
            console.log(error);
          })
      }, 3000);
    },
    // socket_current_connect({state, commit, dispatch}) {
    //   if (state.current_client === null) {
    //     dispatch('setPreloader', true)
    //
    //     state.current_client = {};
    //     state.current_client['client'] = null;
    //     state.current_client['ip'] = current_ip;
    //     state.current_client['client'] = new WebSocket('ws://' + current_ip + '/ws');
    //
    //     state.current_client['client'].onopen = function () {
    //       dispatch('setPreloader', false)
    //       console.log('Соединение с ' + current_ip + ' установлено.');
    //       state.current_client['status'] = true;
    //     };
    //
    //     state.current_client['client'].onclose = function (event) {
    //       if (event.wasClean) {
    //         console.log('Контроллер ' + current_ip + '  отключился');
    //         dispatch('setSnackbar', 'Контроллер ' + current_ip + '  отключился')
    //       } else {
    //         console.log('Обрыв соединения с ' + current_ip);
    //         dispatch('setSnackbar', 'Обрыв соединения с ' + current_ip)
    //       }
    //       state.current_client = null
    //     };
    //
    //     state.current_client['client'].onerror = function (error) {
    //       console.log('Ошибка соединения с ' + current_ip + ' | ' + error);
    //       dispatch('setSnackbar', 'Ошибка соединения с ' + current_ip)
    //       state.current_client = null
    //     };
    //
    //     state.current_client['client'].onmessage = function (event) {
    //       if (IsJsonString(event.data)) {
    //         let mess = JSON.parse(event.data);
    //         let param = Object.keys(mess)[0]
    //         if (param === 'ssdp') {
    //           commit('setSsdp', mess[param])
    //           dispatch('clients_connect')
    //         }
    //       }
    //     }
    //   }
    // },
    clients_connect({state, dispatch}) {
      state.ssdp.forEach(function (val) {
        dispatch('socket_connect', val);
      })
      setInterval(() => state.ssdp.forEach(function (val) {
        dispatch('socket_connect', val);
      }), 5000);
    },
    socket_connect({rootState, state, commit, dispatch, getters}, ssdp_item) {
      let id = ssdp_item.id

      if (state.clients[id] === undefined) {
        commit('createClient', ssdp_item)
      }

      state.clients[id]['client'].onopen = function () {
        commit('updateClient', {id: id, param: 'status', value: true})
        console.log('Соединение с ' + id + ' установлено.');

        setInterval(function () {
          if (state.clients[id]['last_data'] < Math.round(new Date().getTime()/1000) - 60) {
            commit('deleteClient', id)
          }
        }, 1000)
      };

      state.clients[id]['client'].onclose = function (event) {
        if (event.wasClean) {
          console.log('Контроллер ' + id + '  отключился');
        } else {
          console.log('Обрыв соединения с ' + id);
        }
        commit('deleteClient', id)
        commit('hideDrawer')
      };

      state.clients[id]['client'].onerror = function (error) {
        console.log('Ошибка соединения с ' + id + ' | ' + error);
        delete state.clients[id]
      };

      state.clients[id]['client'].onmessage = function (event) {
        state.clients[id]['last_data'] = Math.round(new Date().getTime()/1000)

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
              if (k === 'ssdp') {
                commit('updateSsdp', v)
              } else {
                commit('updateClient', {id: id, param: k, value: v})
                if (k === 'refresh') {
                  location.reload()
                }
                if (k === 'loading') {
                  if (parseInt(v) == 1) {
                    commit('set_preloader', true)
                  }
                  if (parseInt(v) == 0) {
                    commit('set_preloader', false)
                  }
                  if (parseInt(v) > 1) {
                    commit('set_reload_timer', parseInt(v))
                  }
                }

                let drawer_device = rootState.drawer.device;
                if (drawer_device) {
                  let dd_id = drawer_device['id'].toString()
                  if (dd_id.indexOf('_') > 0) {
                    let s = dd_id.split('_')
                    dd_id = s[0]
                  }
                  if (dd_id === id.toString()) {
                    let ch = k.split('_')
                    if (['update_1ch', 'config_1ch'].indexOf(k) >= 0 && drawer_device['ch'] === '_' + ch[1]) {
                      if (k === 'update_1ch')
                        k = 'update'
                      if (k === 'config_1ch')
                        k = 'config_ch'
                      commit('changeDrawerDevice', {param: k, value: v})
                    } else if (['update_2ch', 'config_2ch'].indexOf(k) >= 0 && drawer_device['ch'] === '_' + ch[1]) {
                      if (k === 'update_2ch')
                        k = 'update'
                      if (k === 'config_2ch')
                        k = 'config_ch'
                      commit('changeDrawerDevice', {param: k, value: v})
                    } else {
                      commit('changeDrawerDevice', {param: k, value: v})
                    }
                  }
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
      state.clients[id]['client'].send(payload.mess)
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
                'dev_id': dev['ShotAddr'],
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
                'id': id + '_1ch',
                'dev_id': id,
                'ch': '_1ch',
                'client': state.clients[id]['client'],
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
                'id': id + '_2ch',
                'dev_id': id,
                'ch': '_2ch',
                'client': state.clients[id]['client'],
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
