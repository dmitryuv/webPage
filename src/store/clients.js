const test = false
const current_ip = test ? '192.168.1.218' : location.host;

export default {
  state: {
    ssdp: null,

    current_client: null,
    clients: {},
    error: null,

    thermostats: [],
  },
  mutations: {
    setSsdp(state, payload) {
      state.ssdp = payload
    },

    createClient(state, payload) {
      let client = {
        ['client']: new WebSocket('ws://' + payload['ip'] + '/ws'),
        ['id']: payload['id'],
        ['type']: payload['type'],
        ['update']: null,
        ['wifi_networks']: null,
        ['config']: null,
        ['qr_hk']: null,
        ['update_status']: null,
        ['ip']: payload['ip']
      }

      state.clients = {
        ...state.clients,
        [ payload['id'] ]: { ...client }
      }
    },
    updateClient(state, payload) {
      state.clients[payload['id']][payload['param']] = payload['value']
    },
    deleteClient(state, id) {
      delete state.clients[id]
    }
  },
  actions: {
    startConnect({dispatch}) {
      dispatch('socket_current_connect');
      setInterval(() => {
        dispatch('socket_current_connect');
      }, 3000);
    },
    socket_current_connect({state, commit, dispatch}) {
      if (state.current_client === null) {
        dispatch('setPreloader', true)

        state.current_client = {};
        state.current_client['client'] = null;
        state.current_client['ip'] = current_ip;
        state.current_client['client'] = new WebSocket('ws://' + current_ip + '/ws');

        state.current_client['client'].onopen = function () {
          dispatch('setPreloader', false)
          console.log('Соединение с ' + current_ip + ' установлено.');
          state.current_client['status'] = true;
        };

        state.current_client['client'].onclose = function (event) {
          if (event.wasClean) {
            console.log('Контроллер ' + current_ip + '  отключился');
            dispatch('setSnackbar', 'Контроллер ' + current_ip + '  отключился')
          } else {
            console.log('Обрыв соединения с ' + current_ip);
            dispatch('setSnackbar', 'Обрыв соединения с ' + current_ip)
          }
          state.current_client = null
        };

        state.current_client['client'].onerror = function (error) {
          console.log('Ошибка соединения с ' + current_ip + ' | ' + error);
          dispatch('setSnackbar', 'Ошибка соединения с ' + current_ip)
          state.current_client = null
        };

        state.current_client['client'].onmessage = function (event) {
          if (IsJsonString(event.data)) {
            let mess = JSON.parse(event.data);
            let param = Object.keys(mess)[0]
            if (param === 'ssdp') {
              commit('setSsdp', mess[param])
              dispatch('clients_connect')
            }
          }
        }
      }
    },
    clients_connect({state, dispatch}) {
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
        if (IsJsonString(event.data)) {
          let mess = JSON.parse(event.data);
          let param = Object.keys(mess)[0]
          Object.keys(mess).forEach(function (k) {
            let v = mess[k];
            console.log('Получен ' + param + ' c ' + id);
            if (getters.mkLoad(id)) {
              commit('updateClient', {id: id, param: 'data_loaded', value: true})
            }
            if (['config', 'mqtt_topics', 'update', 'wifi_networks', 'qr_hk', 'update_status'].indexOf(k) >= 0) {
              commit('updateClient', {id: id, param: k, value: v})

              let drawer_device = rootState.drawer.device;
              if (drawer_device && drawer_device['id'] === id) {
                commit('changeDrawerDevice', {param: k, value: v})
              }
            }
          });
        } else {
          console.log('Не правильный JSON');
          console.log(event.data);
        }
      };
    },
  },
  getters: {
    mkLoad: state => {
      return function (id) {
        return state.clients[id]['update'] && state.clients[id]['config'];
      };
    },
    getClients: state => {
      return state.clients
    },
    getThermostats: (state, getters) => {
      let devices = []
      for (let id in state.clients) {
        if (state.clients[id]['type'] === 'esp8266_thermostat' && getters.mkLoad(id)) {
          devices.push(state.clients[id])
        }
        if (state.clients[id]['type'] === 'esp8266_air' && getters.mkLoad(id)) {
          devices.push(state.clients[id])
        }
        if (state.clients[id]['type'] === 'esp32_panel_4inch' && getters.mkLoad(id)) {
          devices.push(state.clients[id])
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
