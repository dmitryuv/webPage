<template>
  <div id="dashboard">
    <v-sheet class="vsheet v">
      <v-navigation-drawer :value="getDrawerStatus" absolute right overlay-opacity="0.4" class="drawer">
        <div class="d-flex align-center justify-space-between drawer_title white--text">
          <div class="d-flex align-center">
            <v-icon color="#249fff" @click="back()" class="mr-2">mdi-arrow-left</v-icon>
            <div>{{ getDrawerTitle }}</div>
          </div>
          <v-spacer/>
          <template v-if="getDrawerDevice && getDrawerDevice['type'] === 'esp32_panel_4inch'">
            <v-icon v-if="getDrawerDialog === 0" color="#249fff" @click="panelConfig = true" class="mx-3">mdi-dots-grid</v-icon>
          </template>
          <v-icon v-if="getDrawerDialog === 0" color="#249fff" @click="changeDrawerDialog([1, 'Настройки'])" class="float-right">mdi-cog</v-icon>
        </div>

        <div class="drawer_body" v-if="getDrawerDevice">
          <DeviceFull/>
        </div>
      </v-navigation-drawer>

      <Header/>

      <v-dialog v-model="panelConfig" fullscreen hide-overlay transition="dialog-bottom-transition" dark>
        <v-card v-if="getDrawerDevice">
          <v-toolbar dark style="background: #2c3041">
            <v-btn icon dark @click="panelConfig = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Конфигурация панели</v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
              <v-btn dark text @click="onSave">Сохранить</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text>
            <Screen v-if="getDrawerDevice && getDrawerDevice['type'] === 'esp32_panel_4inch'"/>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="scanDialog" width="350">
        <v-card class="color_lytko3_bg">
          <v-card-text>
            <div class="white--text mb-3 pt-3 text-center">Введите IP адрес любого устройства Lytko</div>
            <TextInput :label="'IP адрес'" :value="scanIp" @onChange="changedIp($event)"/>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions class="px-6">
            <v-btn color="secondary" @click="scanDialog = false">Отмена</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onScan">Найти</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="devices">
        <div class="filters my-4 text-sm-center pr-8">
          <v-icon color="#249fff" @click="inDevelop">mdi-tune</v-icon>
          <v-chip class="ml-2" color="#2c3041" text-color="white" @click="inDevelop">Все устройства</v-chip>
        </div>
        <div class="room_title d-flex align-center">
          <div class="room_name">КОМНАТА</div>
          <v-icon color="white">mdi-chevron-right</v-icon>
          <span class="devices_count mr-3">{{ devicesLengthText }}</span>
          <v-icon v-if="!devicesLength" color="white" @click="scanDialog = true">mdi-plus</v-icon>
        </div>

        <div class="sensors d-flex" v-if="Object.keys(getSensors).length">
          <Sensor v-for="sensor in getSensors" :key="sensor.id" :sensor="sensor"/>
        </div>
        <div class="thermostats d-flex flex-wrap" v-if="Object.keys(getThermostats).length">
          <Device v-for="thermostat in getThermostats" :key="thermostat.id" :device="thermostat"/>
        </div>
        <div class="switchers d-flex" v-if="switchers.length">

        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
  import Header from "./tpl/Header";
  import Device from "./devices/Device";
  import DeviceFull from "./devices/DeviceFull";

  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import Sensor from "./sensors/Sensor";
  import TextInput from "./tpl/TextInput";
  import Screen from "../panels/103/screens/Screen";

  export default {
    name: "Dashboard",
    components: {Screen, TextInput, Header, Device, DeviceFull, Sensor},
    data() {
      return {
        panelConfig: false,
        scanDialog: false,
        scanIp: null,
        switchers: [],
      }
    },
    computed: {
      ...mapGetters([
        'getClients',
        'getSensors',
        'getThermostats',
        'getDrawerStatus',
        'getDrawerTitle',
        'getDrawerDevice',
        'getDrawerDialog',
        'getDrawerWfsn',
        'getPanelGrid',
        'getFormattedPanelGrid',
      ]),
      devicesLength() {
        return Object.keys(this.getSensors).length + Object.keys(this.getThermostats).length
      },
      devicesLengthText() {
        let num = this.devicesLength.toString()
        let last = num.toString().slice(-1);

        switch (last) {
          case '1':
            return this.devicesLength + ' УСТРОЙСТВО'
          case '2':
          case '3':
          case '4':
            return this.devicesLength + ' УСТРОЙСТВА'
          default:
            return this.devicesLength + ' УСТРОЙСТВ'
        }
      }
    },
    methods: {
      ...mapActions([
        'hideDrawer',
        'showDrawer',
        'inDevelop',
        'changeDrawerDialog',
        'changeDrawerWfsn',
        'setPreloader',
        'startConnect',
      ]),
      ...mapMutations([
        'UPDATE_SSDP'
      ]),
      back() {
        if (this.getDrawerWfsn != null) {
          this.changeDrawerWfsn([null, 'WiFi'])
        } else {
          if (this.getDrawerDialog === 0) {
            this.hideDrawer()
          } else if (this.getDrawerDialog === 1) {
            this.changeDrawerDialog([0, this.getDrawerDevice['config']['name']])
          } else {
            this.changeDrawerDialog([1, 'Настройки'])
          }
        }
      },
      changedIp(event) {
        this.scanIp = event
      },
      onScan() {
        let self = this
        self.setPreloader(true)

        let client = new WebSocket('ws://' + self.scanIp + '/ws')

        client.onopen = function () {
          console.log('Соединение с ' + self.scanIp + ' установлено.');
        };
        client.onclose = function (event) {
          if (event.wasClean) {
            console.log('Контроллер ' + self.scanIp + '  отключился');
          } else {
            console.log('Обрыв соединения с ' + self.scanIp);
          }
        };
        client.onerror = function (error) {
          console.log('Ошибка соединения с ' + self.scanIp + ' | ' + error);
        };
        client.onmessage = function (event) {
          if (self.IsJsonString(event.data)) {
            let mess = JSON.parse(event.data);
            let param = Object.keys(mess)[0]
            if (param === 'ssdp') {
              for (let item of mess[param]) {
                self.UPDATE_SSDP({'id': item.id, 'ip': item.ip, 'type': item.type})
              }
              client.close()
              self.setPreloader(false)
              self.scanDialog = false
              self.scanIp = null
            }
          } else {
            console.log('Не правильный JSON');
            console.log(event.data);
          }
        }
      },
      onSave() {
        console.log(this.getPanelGrid)
        console.log(JSON.stringify(this.getFormattedPanelGrid))
      },
      /**
       * @return {boolean}
       */
      IsJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }
    }
  }
</script>

<style lang="scss">
  #dashboard {
    font-family: 'Noto Sans', sans-serif;
    color: #50566f;

    .v {
      position: relative;
      height: 100vh;
    }

    .drawer {
      top: 50px !important;
      height: calc(100vh - 50px) !important;
      background: #232834;
      border-left: 1px solid #404459;

      .drawer_title {
        border-bottom: 1px solid #404459;
      }

      @media (min-width: 1265px) {
        & {
          width: calc(var(--percent-width) * 35) !important;
        }
        .drawer_title, .drawer_body {
          padding: calc(var(--percent-width) * 1.5) calc(var(--percent-width) * 3);
        }
        .drawer_title .v-icon {
          font-size: calc(var(--percent-width) * 2);
        }
      }
      @media (max-width: 1264px) {
        & {
          width: calc(var(--percent-width) * 40) !important;
        }
        .drawer_title, .drawer_body {
          padding: calc(var(--percent-width) * 1.5) calc(var(--percent-width) * 3);
        }
        .drawer_title .v-icon {
          font-size: calc(var(--percent-width) * 2);
        }
      }
      @media (max-width: 960px) {
        & {
          width: calc(var(--percent-width) * 55) !important;
        }
        .drawer_title, .drawer_body {
          padding: calc(var(--percent-width) * 2) calc(var(--percent-width) * 4);
        }
        .drawer_title .v-icon {
          font-size: calc(var(--percent-width) * 4);
        }
      }
      @media (max-width: 600px) {
        & {
          top: 0 !important;
          width: calc(var(--percent-width) * 100) !important;
          height: 100vh !important;
          border: none;
          transform: none !important;
        }
        .drawer_title, .drawer_body {
          padding: calc(var(--percent-width) * 4) calc(var(--percent-width) * 6);
        }
        .drawer_title .v-icon {
          font-size: calc(var(--percent-width) * 6);
        }
      }
    }

    .devices {
      @media (min-width: 1265px) {
        padding: var(--percent-width);
      }
      @media (max-width: 1264px) {
        padding: var(--percent-width);
      }
      @media (max-width: 960px) {
        padding: calc(var(--percent-width) * 1.6);
      }
      @media (max-width: 600px) {
        padding: calc(var(--percent-width) * 2);
      }

      .room_title, .filters {
        @media (min-width: 1265px) {
          margin: var(--percent-width);
        }
        @media (max-width: 1264px) {
          margin: var(--percent-width);
        }
        @media (max-width: 960px) {
          margin: calc(var(--percent-width) * 1.6);
        }
        @media (max-width: 600px) {
          margin: calc(var(--percent-width) * 2);
        }
      }

      .filters {
        .v-chip {
          @media (min-width: 1265px) {
            font-size: calc(var(--percent-width) * 1.25);
            height: calc(var(--percent-width) * 3);
            border-radius: calc(var(--percent-width) * 3);
            padding: 0 var(--percent-width);
          }
          @media (max-width: 1264px) {
            height: calc(var(--percent-width) * 4);
            font-size: calc(var(--percent-width) * 2);
          }
          @media (max-width: 960px) {
            height: calc(var(--percent-width) * 6);
            font-size: calc(var(--percent-width) * 3);
          }
          @media (max-width: 600px) {
            height: calc(var(--percent-width) * 6);
            font-size: calc(var(--percent-width) * 3);
          }
        }
        .v-icon {
          @media (min-width: 1265px) {
            font-size: calc(var(--percent-width) * 2);
          }
          @media (max-width: 1264px) {
            font-size: calc(var(--percent-width) * 4);
          }
          @media (max-width: 960px) {
            font-size: calc(var(--percent-width) * 6);
          }
          @media (max-width: 600px) {
            font-size: calc(var(--percent-width) * 6);
          }
        }
      }

      .room_title {
        .room_name {
          font-weight: 400;
          color: white;
          @media (min-width: 1265px) {
            font-size: calc(var(--percent-width) * 2);
          }
          @media (max-width: 1264px) {
            font-size: calc(var(--percent-width) * 3);
          }
          @media (max-width: 960px) {
            font-size: calc(var(--percent-width) * 4);
          }
          @media (max-width: 600px) {
            font-size: calc(var(--percent-width) * 4);
          }
        }

        .devices_count {
          font-weight: 300;
          color: #717897;
          @media (min-width: 1265px) {
            margin-left: calc(var(--percent-width) * 1);
            font-size: calc(var(--percent-width) * 1);
          }
          @media (max-width: 1264px) {
            margin-left: calc(var(--percent-width) * 1.5);
            font-size: calc(var(--percent-width) * 1.5);
          }
          @media (max-width: 960px) {
            margin-left: calc(var(--percent-width) * 2);
            font-size: calc(var(--percent-width) * 2);
          }
          @media (max-width: 600px) {
            margin-left: calc(var(--percent-width) * 3);
            font-size: calc(var(--percent-width) * 3);
          }
        }
      }
    }
  }
</style>