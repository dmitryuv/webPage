<template>
  <div id="Thermostat102Full" class="text-center">
    <div class="dialog" v-if="getDrawerDialog === 0">
      <div class="temperature white--text temperature-text">
        <v-row>
          <v-col class="text-right">
            <v-icon color="white" @click="tempDown">mdi-chevron-down</v-icon>
          </v-col>
          <v-col class="text-center">
            {{ getDrawerDevice['update']['temp'] }}&deg;
          </v-col>
          <v-col class="text-left">
            <span class="target_temp">{{ getDrawerDevice['update']['target_temp'] }}&deg;</span>
            <v-icon color="white" @click="tempUp">mdi-chevron-up</v-icon>
          </v-col>
        </v-row>
      </div>
      <div class="thermostat_fan relative">
        <v-icon class="absolute">$Fun0</v-icon>
        <div class="fan_speed white--text">{{ fan_speed * 20 }}%</div>
        <input class="fan_slider w-100" type="range" min="0" max="5" v-model="fan_speed" step="1" @change="onChangeSpeed">
      </div>
      <div class="thermostat_buttons">
        <div class="button button_text pointer" :class="getDrawerDevice['update']['heating'] === 'auto' ? 'active' : ''" @click="onHeating('auto')">
          <v-icon color="white">Auto</v-icon>
        </div>
        <div class="button button_icon pointer" :class="getDrawerDevice['update']['heating'] === 'heat' ? 'active' : ''" @click="onHeating('heat')">
          <v-icon color="white">mdi-fire</v-icon>
        </div>
        <div class="button button_icon pointer" :class="getDrawerDevice['update']['heating'] === 'cool' ? 'active' : ''" @click="onHeating('cool')">
          <v-icon color="white">mdi-snowflake</v-icon>
        </div>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 1">
      <TextInput :label="'Имя контроллера'" :value="name" @onChange="changedName($event)"/>
      <div class="mb-2"></div>
      <ItemMenu
          :text="'Обновление'"
          :right="getDrawerDevice['config']['link'] ? 'Доступно' : null"
          :right_class="'color_lytko'"
          @click.native="changeDrawerDialog([2, 'Обновление'])"
      />
      <div class="mb-2"></div>

      <ItemMenu :text="'Комната'" @click.native="changeDrawerDialog([3, 'Комната'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'HomeKit'" @click.native="changeDrawerDialog([4, 'HomeKit'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'MQTT'" @click.native="changeDrawerDialog([5, 'MQTT'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'WiFi'" :right="getDrawerDevice['config']['wifi_name']" :right_class="'grey--text'" @click.native="changeDrawerDialog([6, 'WiFi'])"/>
      <div class="mb-2"></div>

      <v-row>
        <v-col>
          <BtnOutlined :text="'Сброс настроек'" :fw="true" @click.native="onReset"/>
        </v-col>
        <v-col>
          <BtnBg :text="'Удалить'" :fw="true" @click.native="inDevelop"/>
        </v-col>
      </v-row>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 2">
      <div class="fullheight_dialog d-flex flex-column">
        <v-row class="d-block d-sm-none">
          <v-col>
            <v-icon size="100">$UpgradeLogo</v-icon>
          </v-col>
        </v-row>
        <v-spacer class="d-block d-sm-none"/>
        <v-row>
          <v-col>
            <div class="d-none d-sm-block dark_bg text-left pa-3 mb-5">
              <small>Текущая версия: {{ getDrawerDevice['config']['version'] }}</small>
              <div class="white--text">
                {{ getDrawerDevice['config']['version_new'] ? 'Доступно обновление' : 'Нет доступных обновлений' }}
              </div>
            </div>

            <div class="d-block d-sm-none text-left pa-3 mb-5">
              <small>Текущая версия: {{ getDrawerDevice['config']['version'] }}</small>
              <div class="white--text">
                {{ getDrawerDevice['config']['version_new'] ? 'Доступно обновление ' + getDrawerDevice['config']['version_new'] : 'Нет доступных обновлений' }}
              </div>
              <div class="white--text">
                ID чипа: {{ getDrawerDevice['id'] }}
              </div>
            </div>

            <div v-if="getDrawerDevice['update_status']">
              <div>Идет обновление...</div>
              <v-progress-linear :value="getDrawerDevice['update_status']"></v-progress-linear>
              <div v-if="getDrawerDevice['update_status'] === '100'">перезагрузка устройства...</div>
            </div>
          </v-col>
        </v-row>
        <v-spacer/>
        <v-row align-content="end" v-if="!getDrawerDevice['update_status']">
          <v-col>
            <BtnOutlined text="Выбрать файл" :fw="true" @click.native="onUpgradeFile"/>
          </v-col>
          <v-col v-if="getDrawerDevice['config']['version_new']">
            <BtnBg text="Обновить" :fw="true" @click.native="onUpgrade"/>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 3">
      <div>
        <div class="text-left white--text">Требуется синхронизация с облаком</div>
        <div class="text-left white--text">(в разработке)</div>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 4">
      <div class="fullheight_dialog d-flex flex-column" v-if="getDrawerDevice['config']['homekit'] === '1'">
        <div class="mt-5 text-justify white--text">
          Экспериментальная версия прошивки HomeKit представлена для тестового ознакомления. Отсканируйте QR-код, чтобы добавить устройство в приложение Дом
        </div>
        <div class="mt-5 text-justify">
          <div class="qr_block" v-if="getDrawerDevice['qr_hk']">
            <qrcode-vue :value="getDrawerDevice['qr_hk']" size="300"/>
          </div>
        </div>
      </div>

      <div class="fullheight_dialog d-flex flex-column" v-if="getDrawerDevice['config']['homekit'] === '0'">
        <div>
          <div class="mt-5 text-justify white--text">
            Экспериментальная версия прошивки HomeKit представлена для тестового ознакомления.
          </div>
          <div class="mt-5 text-justify white--text">
            При активации режима HomeKit устройство перезагрузится. Использование MQTT будет невозможно.
          </div>
        </div>
        <v-spacer/>
        <v-row align-content="end">
          <v-col>
            <BtnBg text="Переключить" @click.native="onChangeHK(1)"/>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 5">
      <div class="fullheight_dialog d-flex flex-column" v-if="getDrawerDevice['config']['homekit'] === '0'">
        <div>
          <div class="mb-5">
            <TextInput
                label="Адрес"
                placeholder="Введите адрес сервера*"
                :value="mqtt.server"
                :disabled="getDrawerDevice['config']['mqtt_use'] === '1'"
                @onChange="mqtt.server = $event"
            />
          </div>
          <div class="mb-5">
            <TextInput
                label="Порт"
                placeholder="Введите порт*"
                :value="mqtt.port"
                :disabled="getDrawerDevice['config']['mqtt_use'] === '1'"
                @onChange="mqtt.port = $event"
            />
          </div>
          <div class="mb-5">
            <TextInput
                label="Логин"
                placeholder="Введите логин*"
                :value="mqtt.login"
                :disabled="getDrawerDevice['config']['mqtt_use'] === '1'"
                @onChange="mqtt.login = $event"
            />
          </div>
          <TextInput
              label="Пароль"
              placeholder="Введите пароль*"
              :disabled="getDrawerDevice['config']['mqtt_use'] === '1'"
              @onChange="mqtt.pass = $event"
          />
        </div>
        <v-row align-content="end">
          <v-col v-if="getDrawerDevice['config']['mqtt_use'] === '0'">
            <BtnBg text="Подключить" @click.native="onConnectMqtt"/>
          </v-col>
          <v-col v-if="getDrawerDevice['config']['mqtt_use'] === '1'">
            <BtnBg text="Отключить" @click.native="onDisconnectMqtt"/>
          </v-col>
        </v-row>
      </div>

      <div class="fullheight_dialog d-flex flex-column" v-if="getDrawerDevice['config']['homekit'] === '1'">
        <div>
          <div class="mt-5 text-justify white--text">
            При активации режима MQTT устройство перезагрузится. Использование HomeKit будет невозможно
          </div>
        </div>
        <v-spacer/>
        <v-row align-content="end">
          <v-col>
            <BtnBg text="Переключить" @click.native="onChangeHK(0)"/>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 6">
      <div class="fullheight_dialog d-flex flex-column">
        <template v-if="getDrawerWfsn === null">
          <v-row>
            <v-col>
              <div
                  class="wifi_networks color_lytko3_bg text-left pa-3 mb-3 pointer relative"
                  v-for="(network, index) of getDrawerDevice['wifi_networks']"
                  :key="index"
                  @click="changeDrawerWfsn([index, network['ssid']])">
                <div class="white--text">{{ network['ssid'] }}</div>
                <small>{{ wifi_encryptions[network['encryption']] }}</small>
                <v-icon color="white" class="wifi_signal absolute float-right">{{ wifi_icon(network['signal']) }}</v-icon>
              </div>
            </v-col>
          </v-row>
          <v-spacer/>
          <v-row align-content="end">
            <v-col>
              <BtnBg text="Обновить" :fw="true" @click.native="onWifiUpdate"/>
            </v-col>
          </v-row>
        </template>

        <template v-else>
          <v-row>
            <v-col>
              <div class="wifi_networks text-left">
                <PassInput :label="'Пароль'" :value="wifi_pass" @onChange="changedWifiPass($event)"/>
              </div>
            </v-col>
          </v-row>
          <v-spacer/>
          <v-row align-content="end">
            <v-col>
              <BtnBg text="Подключить" :fw="true" @click.native="onConnectWifi"/>
            </v-col>
          </v-row>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import QrcodeVue from 'qrcode.vue'

  import TextInput from "../tpl/TextInput";
  import PassInput from "../tpl/PassInput";
  import ItemMenu from "../tpl/ItemMenu";
  import BtnBg from "../tpl/BtnBg";
  import BtnOutlined from "../tpl/BtnOutlined";

  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Thermostat102Full",
    components: {QrcodeVue, TextInput, PassInput, ItemMenu, BtnBg, BtnOutlined},
    data() {
      return {
        name: null,
        fan_speed: null,
        mqtt: {
          server: null,
          port: null,
          login: null,
          pass: null,
        },
        wifi_encryptions: {
          '5': 'WEP',
          '2': 'WPA / PSK',
          '4': 'WPA2 / PSK',
          '7': 'open network',
          '8': 'WPA / WPA2 / PSK',
        },
        wifi_pass: null,
      }
    },
    computed: {
      ...mapGetters([
        'getDrawerTitle',
        'getDrawerDevice',
        'getDrawerDialog',
        'getDrawerWfsn',
      ]),
      drawerWfsn() {
        return this.getDrawerWfsn
      },
      wifi_ssid() {
        if (this.getDrawerWfsn != null) {
          return this.getDrawerTitle
        }
        return null
      }
    },
    watch: {
      name(val) {
        if (this.getDrawerDevice['config']['name'] !== val) {
          this.getDrawerDevice['client'].send('{"config":{"name":"' + val + '"}}')
        }
      },
      drawerWfsn() {
        this.wifi_pass = null
      }
    },
    mounted() {
      this.name = this.getDrawerDevice['config']['name']
      this.fan_speed = this.getDrawerDevice['update']['fan_speed']

      this.mqtt.server = this.getDrawerDevice['config']['mqtt_server']
      this.mqtt.port = this.getDrawerDevice['config']['mqtt_port']
      this.mqtt.login = this.getDrawerDevice['config']['mqtt_login']
    },
    methods: {
      ...mapActions([
        'changeDrawerTitle',
        'changeDrawerDialog',
        'changeDrawerWfsn',
        'setPreloader',
        'hideDrawer',
        'setSnackbar',
        'inDevelop',
      ]),
      changedName(event) {
        this.name = event
        this.changeDrawerTitle(event)
      },
      changedWifiPass(event) {
        this.wifi_pass = event
      },
      onHeating(mode) {
        if (mode === 'auto') {
          if (this.getDrawerDevice['update']['heating'] !== 'auto') {
            this.getDrawerDevice['client'].send('{"heating":3}')
          } else {
            this.getDrawerDevice['client'].send('{"heating":0}')
          }
        }

        if (mode === 'heat') {
          if (this.getDrawerDevice['update']['heating'] !== 'heat') {
            this.getDrawerDevice['client'].send('{"heating":1}')
          } else {
            this.getDrawerDevice['client'].send('{"heating":0}')
          }
        }

        if (mode === 'cool') {
          if (this.getDrawerDevice['update']['heating'] !== 'cool') {
            this.getDrawerDevice['client'].send('{"heating":2}')
          } else {
            this.getDrawerDevice['client'].send('{"heating":0}')
          }
        }
      },
      tempDown() {
        this.getDrawerDevice['client'].send('"tempDown"')
      },
      tempUp() {
        this.getDrawerDevice['client'].send('"tempUp"')
      },
      onChangeSpeed() {
        this.getDrawerDevice['client'].send(`{"fan_speed":${this.fan_speed}}`)
      },
      onUpgradeFile() {
        window.open(`http://${this.getDrawerDevice['ip']}/manual_update`, '_blank');
      },
      onUpgrade() {
        this.getDrawerDevice['client'].send('{"files":{"ino_bin":"' + this.getDrawerDevice['config']['link'] + '"}}')
      },
      onChangeHK(status) {
        this.rebootPreloader()
        if (status) {
          this.getDrawerDevice['client'].send('{"config":{"homekit":"1"}}')
        } else {
          this.getDrawerDevice['client'].send('{"config":{"homekit":"0"}}')
        }
      },
      onConnectMqtt() {
        if (this.mqtt.server.length && this.mqtt.port.length && this.mqtt.login.length && this.mqtt.pass.length) {
          this.rebootPreloader()
          this.getDrawerDevice['client']
            .send('{"mqtt_connect": {"mqtt_server":' + this.mqtt.server + ',"mqtt_port":' + this.mqtt.port + ',"mqtt_login":' + this.mqtt.login + ',"mqtt_password":' + this.mqtt.pass + '}}')
        } else {
          this.setSnackbar('Заполните все поля')
        }
      },
      onDisconnectMqtt() {
        this.getDrawerDevice['client'].send('{"mqtt_disconnect":1}')
        this.rebootPreloader()
      },
      onWifiUpdate() {
        this.getDrawerDevice['client'].send('{"wifi_refresh":1}')
      },
      onConnectWifi() {
        if (this.wifi_ssid && this.wifi_pass.length) {
          this.getDrawerDevice['client'].send('{"wifi_connect":{"ssid":"' + this.wifi_ssid + '","password":"' + this.wifi_pass + '"}}')
          this.rebootPreloader()
        }
      },
      onReset() {
        this.rebootPreloader()
        this.getDrawerDevice['client'].send('"reset"')
      },

      rebootPreloader() {
        let self = this
        self.setPreloader(true)
        setTimeout(function () {
          self.setPreloader(false)
          self.hideDrawer()
        }, 15000)
      },
      wifi_icon(signal) {
        let s = parseInt(signal)
        if (s === 0) {
          return '$Wifi0'
        }
        if (s > 0 && s <= 20) {
          return '$Wifi1'
        }
        if (s > 20 && s <= 40) {
          return '$Wifi2'
        }
        if (s > 40 && s <= 70) {
          return '$Wifi3'
        }
        if (s > 70) {
          return '$Wifi4'
        }
      },
    }
  }
</script>

<style lang="scss">
  #Thermostat102Full {
    width: 100%;

    .temperature {
      background: #2c3041;
      border-radius: var(--percent-width);
      border: 0;
      font-weight: 300;

      .target_temp {
        position: absolute;
      }
    }

    .thermostat_fan {
      background: #2c3041;
      border-radius: var(--percent-width);
      border: 0;
      margin-bottom: var(--percent-width);
      padding: var(--percent-width);
      font-weight: 300;
    }

    .thermostat_buttons {
      .button {
        background: #1f3c62;
        width: 100%;
        position: relative;
        &.active {
          background: #035cd0;
        }
        .v-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          font-style: initial;
        }
      }
    }

    .dialog {
      .hysteresis {
        color: #717897;
      }

      .qr_block {
        border: 1px solid #035cd0;
        border-radius: calc(var(--percent-width) * 2);
        padding: calc(var(--percent-width) * 2);
        margin: calc(var(--percent-width) * 2);
        canvas {
          width: 100% !important;
          height: auto !important;
        }
      }

      .wifi_networks {
        border-radius: calc(var(--percent-width) / 2);

        .wifi_signal {
          right: 15px;
          top: 23px;
        }
      }
    }

    @media (min-width: 1265px) {
      .temperature {
        font-size: calc(var(--percent-width) * 4);
        padding: calc(var(--percent-width) * 3) 0;
        margin-bottom: var(--percent-width);

        .target_temp {
          font-size: calc(var(--percent-width) * 2);
          margin-top: calc(var(--percent-width) * -1.5)
        }
      }

      .thermostat_fan {
        .v-icon {
          left: 7px;
          top: 7px;
          height: calc(var(--percent-width) * 1.5);
          width: calc(var(--percent-width) * 1.5);
        }
        .fan_speed {
          font-size: calc(var(--percent-width) * 2);
        }
      }

      .thermostat_buttons {
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 6);
          width: calc(var(--percent-width) * 6);
          display: inline-block;
          margin: 0 var(--percent-width);

          &.button_text .v-icon {
            font-size: calc(var(--percent-width) * 2);
          }
          &.button_icon .v-icon svg {
            height: calc(var(--percent-width) * 2);
            width: calc(var(--percent-width) * 2);
          }
        }
      }

      .dialog {
        .dialog-back {
          margin-bottom: 15px;
        }
        .hysteresis, .diapason {
          .val {
            font-size: calc(var(--percent-width) * 2);
          }
          /*.help {*/
          /*  font-size: calc(var(--percent-width) * 1.5);*/
          /*}*/
        }
        .fullheight_dialog {
          height: calc(100vh - 191px);
        }
      }
    }

    @media (max-width: 1264px) {
      .temperature {
        font-size: calc(var(--percent-width) * 5);
        padding: calc(var(--percent-width) * 3) 0;
        margin-bottom: var(--percent-width);

        .target_temp {
          font-size: calc(var(--percent-width) * 2);
          margin-top: calc(var(--percent-width) * -1)
        }
      }

      .thermostat_fan {
        .v-icon {
          left: 7px;
          top: 7px;
          height: calc(var(--percent-width) * 2);
          width: calc(var(--percent-width) * 2);
        }
        .fan_speed {
          font-size: calc(var(--percent-width) * 2);
        }
      }

      .thermostat_buttons {
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 8);
          width: calc(var(--percent-width) * 8);
          display: inline-block;
          margin: 0 var(--percent-width);

          &.button_text .v-icon {
            font-size: calc(var(--percent-width) * 2.5);
          }
          &.button_icon .v-icon svg {
            height: calc(var(--percent-width) * 3);
            width: calc(var(--percent-width) * 3);
          }
        }
      }

      .dialog {
        .dialog-back {
          margin-bottom: calc(var(--percent-width) * 2);
        }
        .hysteresis, .diapason {
          .val {
            font-size: calc(var(--percent-width) * 3);
          }
          .help {
            font-size: calc(var(--percent-width) * 1.5);
          }
        }
        .fullheight_dialog {
          height: calc(100vh - 135px);
        }
      }
    }

    @media (max-width: 960px) {
      .temperature {
        font-size: calc(var(--percent-width) * 6);
        padding: calc(var(--percent-width) * 5) 0;
        margin-bottom: var(--percent-width);

        .target_temp {
          font-size: calc(var(--percent-width) * 3);
          margin-top: calc(var(--percent-width) * -2.5)
        }
      }

      .thermostat_fan {
        .v-icon {
          left: 7px;
          top: 7px;
          height: calc(var(--percent-width) * 3);
          width: calc(var(--percent-width) * 3);
        }
        .fan_speed {
          font-size: calc(var(--percent-width) * 4);
        }
      }

      .thermostat_buttons {
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 10);
          width: calc(var(--percent-width) * 10);
          display: inline-block;
          margin: 0 var(--percent-width);

          &.button_text .v-icon {
            font-size: calc(var(--percent-width) * 3);
          }
          &.button_icon .v-icon svg {
            height: calc(var(--percent-width) * 4);
            width: calc(var(--percent-width) * 4);
          }
        }
      }

      .dialog {
        .dialog-back {
          margin-bottom: calc(var(--percent-width) * 3);
        }
        .hysteresis, .diapason {
          .val {
            font-size: calc(var(--percent-width) * 4);
          }
          .help {
            font-size: calc(var(--percent-width) * 2);
          }
        }
        .fullheight_dialog {
          height: calc(100vh - 150px);
        }
      }
    }

    @media (max-width: 600px) {
      .temperature {
        font-size: calc(var(--percent-width) * 10);
        padding: calc(var(--percent-width) * 8) 0;
        margin-bottom: var(--percent-width);

        .target_temp {
          font-size: calc(var(--percent-width) * 4);
          margin-top: calc(var(--percent-width) * -2.5)
        }
      }

      .thermostat_fan {
        .v-icon {
          left: 7px;
          top: 7px;
          height: calc(var(--percent-width) * 6);
          width: calc(var(--percent-width) * 6);
        }
        .fan_speed {
          font-size: calc(var(--percent-width) * 6);
        }
      }

      .thermostat_buttons {
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 20);
          width: calc(var(--percent-width) * 20);
          display: inline-block;
          margin: 0 var(--percent-width);

          &.button_text .v-icon {
            font-size: calc(var(--percent-width) * 5);
          }
          &.button_icon .v-icon svg {
            height: calc(var(--percent-width) * 10);
            width: calc(var(--percent-width) * 10);
          }
        }
      }

      .dialog {
        .dialog-back {
          margin-left: 0 - calc(var(--percent-width) * 6);
          margin-bottom: calc(var(--percent-width) * 6);
        }
        .hysteresis, .diapason {
          .val {
            font-size: calc(var(--percent-width) * 6);
          }
          .help {
            font-size: calc(var(--percent-width) * 4);
          }
        }
        .fullheight_dialog {
          height: calc(100vh - calc(var(--percent-width) * 24));
        }
      }
    }
  }
</style>