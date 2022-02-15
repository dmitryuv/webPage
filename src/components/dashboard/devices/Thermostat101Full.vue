<template>
  <div id="Thermostat101Full" class="text-center">
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
      <div class="thermostat_buttons">
        <div class="button pointer mx-auto" :class="getDrawerDevice['update']['heating'] === 'heat' ? 'active' : ''" @click="onHeating">
          <v-icon color="white">mdi-fire</v-icon>
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

      <ItemMenu :text="'Тип датчика'" @click.native="changeDrawerDialog([3, 'Тип датчика'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'Комната'" @click.native="changeDrawerDialog([4, 'Комната'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'Гистерезис'" @click.native="changeDrawerDialog([5, 'Гистерезис'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'Температура'" @click.native="changeDrawerDialog([6, 'Температура'])"/>
      <div class="mb-2"></div>

      <ItemMenu
          :text="'Внешние датчики'"
          :right="getDrawerDevice['config']['mqtt_use'] === '0' ? 'Только MQTT' : ''"
          :right_class="'color_lytko2 body-2'"
          @click.native="changeDrawerDialog([7, 'Внешние датчики'])"
          v-if="getDrawerDevice['config']['homekit'] === '0'"
      />
      <div class="mb-2"></div>

      <ItemMenu :text="'HomeKit'" @click.native="changeDrawerDialog([8, 'HomeKit'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'MQTT'" @click.native="changeDrawerDialog([9, 'MQTT'])"/>
      <div class="mb-2"></div>

      <ItemMenu
          :text="'Яндекс Алиса'"
          @click.native="changeDrawerDialog([10, 'Яндекс Алиса'])"
          v-if="getDrawerDevice['config']['homekit'] === '1' || getDrawerDevice['config']['homekit'] === '2'"
      />
      <div class="mb-2"></div>

      <ItemMenu :text="'WiFi'" :right="getDrawerDevice['config']['wifi_name']" :right_class="'grey--text'" @click.native="changeDrawerDialog([11, 'WiFi'])"/>
      <div class="mb-2"></div>

      <ItemMenu :text="'Экран'" @click.native="changeDrawerDialog([12, 'Экран'])"/>
      <div class="mb-5"></div>

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
              <div><small>Текущая версия: {{ getDrawerDevice['config']['version'] }}</small></div>
              <div><small>ID чипа: {{ getDrawerDevice['id'] }}</small></div>
              <div class="white--text">
                {{ getDrawerDevice['config']['version_new'] ? 'Доступна версия ' + getDrawerDevice['config']['version_new'] : 'Нет доступных обновлений' }}
              </div>
            </div>

            <div class="d-block d-sm-none text-left pa-3 mb-5">
              <small>Текущая версия: {{ getDrawerDevice['config']['version'] }}</small>
              <div class="white--text">
                {{ getDrawerDevice['config']['version_new'] ? 'Доступна версия ' + getDrawerDevice['config']['version_new'] : 'Нет доступных обновлений' }}
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
      <div class="sensors">
        <ItemCheck
            v-for="item in Object.keys(sensors)"
            :key="item"
            :text="sensors[item]"
            :active="getDrawerDevice['config']['sensor_model_id'] == item"
            @click.native="onChangeSensor(item)"
        />
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 4">
      <div>
        <div class="text-left white--text">Требуется синхронизация с облаком</div>
        <div class="text-left white--text">(в разработке)</div>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 5">
      <div class="hysteresis">
        <v-row>
          <v-col>
            <div class="mb-2">Шаг</div>
            <div>
              <v-icon color="white" @click="onHysteresisUp">mdi-menu-up</v-icon>
            </div>
            <div class="color_lytko val">{{ parseInt(getDrawerDevice['config']['hysteresis']) }}</div>
            <div>
              <v-icon color="white" @click="onHysteresisDown">mdi-menu-down</v-icon>
            </div>
          </v-col>
          <v-col>
            <div class="mb-2">Корректировка t&deg;</div>
            <div>
              <v-icon color="white" @click="onCorrectionUp">mdi-menu-up</v-icon>
            </div>
            <div class="color_lytko val">{{ parseFloat(getDrawerDevice['config']['sensor_corr']).toFixed(1) }}</div>
            <div>
              <v-icon color="white" @click="onCorrectionDown">mdi-menu-down</v-icon>
            </div>
          </v-col>
        </v-row>
        <div class="help d-block d-sm-none mt-4">
          <div class="mb-4 text-left white--text text-justify">
            Гистерезис - разница между текущей и заданной температурой. Термостат нагревает пол только в том случае, если текущая температура меньше заданной на
            эту разницу.
          </div>
          <div class="text-left white--text text-justify">
            Корректировка температуры - сдвиг показаний текущей температуры с датчика в большую или меньшую сторону для более гибкой настройки.
          </div>
        </div>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 6">
      <div class="diapason fullheight_dialog d-flex flex-column">
        <v-row align-content="start">
          <v-col cols="6">
            <div class="mb-2">Минимальная</div>
            <div class="color_lytko val mt-5">{{ getDrawerDevice['config']['min_temp'] }}</div>
          </v-col>
          <v-col cols="6">
            <div class="mb-2">Максимальная</div>
            <div class="color_lytko val mt-5">{{ getDrawerDevice['config']['max_temp'] }}</div>
          </v-col>
          <v-col cols="12">
            <div class="help">
              <div class="mb-4 text-left white--text text-justify">Для смены вывода текущей и целевой температуры нажмите кнопку ниже</div>
              <div class="text-left white--text text-justify">Для изменения порогов температуры необходимо сбросить устройство и заново произвести
                первоначальную
                конфигурацию
              </div>
            </div>
          </v-col>
        </v-row>
        <v-spacer/>
        <v-row align-content="end">
          <v-col>
            <BtnBg text="Переключить" :fw="true" @click.native="onChangeTargetTempFirst"/>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 7">
      <div class="fullheight_dialog d-flex flex-column">
        <div v-if="getDrawerDevice['config']['mqtt_use'] === '0'" class="text-left white--text">
          Доступно только в режиме MQTT
        </div>
        <div v-if="getDrawerDevice['config']['mqtt_use'] === '1'" class="text-left white--text">
          <div class="mb-5">
            <TextInput
                label="Топик"
                placeholder="Введите топик"
                :value="mqtt_external_topic"
                @onChange="mqtt_external_topic = $event"
            />
          </div>
        </div>
        <v-row align-content="end">
          <v-col>
            <BtnBg v-if="getDrawerDevice['config']['mqtt_external_topic'] == ''" text="Подключить" @click.native="onConnectExternarSensor"/>
            <BtnBg v-else text="Отключить" @click.native="onDisconnectExternarSensor"/>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 8">
      <div class="fullheight_dialog d-flex flex-column" v-if="getDrawerDevice['config']['homekit'] === '1' || getDrawerDevice['config']['homekit'] === '2'">
        <template v-if="getDrawerDevice['config']['pair_hk'] === '1'">
          <div class="mt-5 text-justify white--text">
            Соединение с приложением Дом установлено
          </div>
          <div class="mt-5 text-justify">
            <BtnOutlined text="Очистить пару" @click.native="onClearHK"/>
          </div>
        </template>
        <template v-else>
          <div class="mt-5 text-justify white--text">
            Экспериментальная версия прошивки HomeKit представлена для тестового ознакомления. Отсканируйте QR-код, чтобы добавить устройство в приложение Дом
          </div>
          <div class="mt-5 text-justify">
            <div class="qr_block" v-if="getDrawerDevice['qr_hk']">
              <qrcode-vue :value="getDrawerDevice['qr_hk']" :background="'#000'" :foreground="'#fff'" size="300"/>
            </div>
          </div>
        </template>
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

    <div class="dialog" v-if="getDrawerDialog === 9">
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
          <div class="mb-5">
            <PassInput
                label="Пароль"
                placeholder="Введите пароль*"
                :value="mqtt.pass"
                :disabled="getDrawerDevice['config']['mqtt_use'] === '1'"
                @onChange="mqtt.pass = $event"
            />
          </div>
        </div>
        <div v-if="getDrawerDevice['config']['mqtt_use'] === '1' && getDrawerDevice['mqtt_topics']">
          <v-dialog dark scrollable v-model="mqtt_data_dialog" width="500">
            <v-card style="background: #232834">
              <v-card-title class="text-h5 dark lighten-2">Получение данных</v-card-title>
              <v-card-text>
                <div class="pa-3">
                  <h3>Данные</h3>
                </div>
                <div style="background: #202530" class="pa-3 mb-1">
                  <div><code>{</code></div>
                  <div><code>&nbsp;"update": {</code></div>
                  <div><code>&nbsp;&nbsp;"temp": {{ getDrawerDevice['update']['temp'] }},</code></div>
                  <div><code>&nbsp;&nbsp;"target_temp": {{ getDrawerDevice['update']['target_temp'] }},</code></div>
                  <div><code>&nbsp;&nbsp;"relay": {{ getDrawerDevice['update']['relay'] }},</code></div>
                  <div><code>&nbsp;&nbsp;"heating": "{{ getDrawerDevice['update']['heating'] }}",</code></div>
                  <div><code>&nbsp;&nbsp;"name": "{{ getDrawerDevice['update']['name'] }}",</code></div>
                  <div><code>&nbsp;&nbsp;"unit": "{{ getDrawerDevice['update']['unit'] }}"</code></div>
                  <div><code>&nbsp;}</code></div>
                  <div><code>}</code></div>
                </div>
                <div style="background: #202530" class="pa-3 mb-1">
                  <div>Топик для получения данных:</div>
                  <code>{{ this.getDrawerDevice['mqtt_topics']['state'] }}</code>
                </div>
                <div class="pa-3">
                  <h3>Управление термостатом</h3>
                </div>
                <div style="background: #202530" class="pa-3 mb-1">
                  <div>Установить температуру нагрева в C:</div>
                  <code>{{ this.getDrawerDevice['mqtt_topics']['target_temp'] }}</code>
                </div>
                <div style="background: #202530" class="pa-3 mb-1">
                  <div>Повысить температуру на n градусов (n - payload):</div>
                  <code>{{ this.getDrawerDevice['mqtt_topics']['step_up'] }}</code>
                </div>
                <div style="background: #202530" class="pa-3 mb-1">
                  <div>Управление нагревом:</div>
                  <div><code>{{ this.getDrawerDevice['mqtt_topics']['heating'] }}</code></div>
                  <div><code>on - включить нагрев</code></div>
                  <div><code>off - отключить нагрев</code></div>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="mqtt_data_dialog = false">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <BtnOutlined text="Получить данные MQTT" @click.native="mqtt_data_dialog = true"/>
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

      <div class="fullheight_dialog d-flex flex-column" v-if="getDrawerDevice['config']['homekit'] === '1' || getDrawerDevice['config']['homekit'] === '2'">
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

    <div class="dialog" v-if="getDrawerDialog === 10">
      <div class="fullheight_dialog d-flex flex-column">
        <div>
          <div class="mb-5">
            <TextInput
                label="Логин"
                placeholder="Введите логин*"
                :value="mqttAlice.login"
                @onChange="mqttAlice.login = $event"
            />
          </div>
          <div class="mb-5">
            <PassInput
                label="Пароль"
                placeholder="Введите пароль*"
                :value="mqttAlice.pass"
                @onChange="mqttAlice.pass = $event"
            />
          </div>
        </div>
      </div>
      <v-spacer/>
      <v-row align-content="end">
        <v-col>
          <BtnBg v-if="getDrawerDevice['config']['mqtt_alice'] == '1'" text="Отключить" @click.native="onDisconnectAlice"/>
          <BtnBg v-else text="Подключить" @click.native="onConnectAlice"/>
        </v-col>
      </v-row>
    </div>

    <div class="dialog" v-if="getDrawerDialog === 11">
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

    <div class="dialog" v-if="getDrawerDialog === 12">
      <div class="fullheight_dialog d-flex flex-column">
        <ItemMenu
            :im_class="'pointer'"
            :text="'Отключать подсветку'"
            :right_icon="getDrawerDevice['config']['nex_bl'] != 0 ? 'mdi-check' : null"
            @click.native="changeNexBl"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import QrcodeVue from 'qrcode.vue'

  import TextInput from "../tpl/TextInput";
  import PassInput from "../tpl/PassInput";
  import ItemMenu from "../tpl/ItemMenu";
  import ItemCheck from "../tpl/ItemCheck";
  import BtnBg from "../tpl/BtnBg";
  import BtnOutlined from "../tpl/BtnOutlined";

  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Thermostat101Full",
    components: {QrcodeVue, TextInput, PassInput, ItemMenu, ItemCheck, BtnBg, BtnOutlined},
    data() {
      return {
        name: null,
        sensors: {
          '0': 'Digital',
          '1': '3.3 кОм',
          '2': '5 кОм',
          '3': '6.8 кОм',
          '4': '10 кОм',
          '5': '12 кОм',
          '6': '14.8 кОм',
          '7': '15 кОм',
          '8': '20 кОм',
          '9': '33 кОм',
          '10': '47 кОм',
        },
        mqtt: {
          server: null,
          port: null,
          login: null,
          pass: null,
        },
        mqttAlice: {
          login: null,
          pass: null,
        },
        mqtt_external_topic: null,
        wifi_encryptions: {
          '5': 'WEP',
          '2': 'WPA / PSK',
          '4': 'WPA2 / PSK',
          '7': 'open network',
          '8': 'WPA / WPA2 / PSK',
        },
        wifi_pass: null,
        mqtt_data_dialog: false,
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
        if (this.getDrawerDevice['config']['name'] != val) {
          this.getDrawerDevice['client'].send('{"config":{"name":"' + val + '"}}')
        }
      },
      drawerWfsn() {
        this.wifi_pass = null
      }
    },
    mounted() {
      this.name = this.getDrawerDevice['config']['name']
      this.mqtt.server = this.getDrawerDevice['config']['mqtt_server']
      this.mqtt.port = this.getDrawerDevice['config']['mqtt_port']
      this.mqtt.login = this.getDrawerDevice['config']['mqtt_login']
      this.mqtt_external_topic = this.getDrawerDevice['config']['mqtt_external_topic']
      this.mqttAlice.login = this.getDrawerDevice['config']['alice_login']
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
      onHeating() {
        if (this.getDrawerDevice['update']['heating'] === 'heat') {
          this.getDrawerDevice['client'].send('{"heating":0}')
        } else {
          this.getDrawerDevice['client'].send('{"heating":1}')
        }
      },
      tempDown() {
        this.getDrawerDevice['client'].send('"tempDown"')
      },
      tempUp() {
        this.getDrawerDevice['client'].send('"tempUp"')
      },
      onChangeSensor(item) {
        this.rebootPreloader()
        this.getDrawerDevice['client'].send('{"sensor_model_id":' + item + '}')
      },
      onHysteresisUp() {
        let new_val = parseInt(this.getDrawerDevice['config']['hysteresis'])
        if (new_val < 5) {
          new_val++
        }
        this.getDrawerDevice['client'].send('{"hysteresis":"' + new_val + '" }')
      },
      onHysteresisDown() {
        let new_val = parseInt(this.getDrawerDevice['config']['hysteresis'])
        if (new_val > 1) {
          new_val--
        }
        this.getDrawerDevice['client'].send('{"hysteresis":"' + new_val + '" }')
      },
      onCorrectionUp() {
        let new_val = parseFloat(this.getDrawerDevice['config']['sensor_corr'])
        if (new_val < 5) {
          new_val += 0.5
        }
        this.getDrawerDevice['client'].send('{"sensor_corr":"' + new_val + '" }')
      },
      onCorrectionDown() {
        let new_val = parseFloat(this.getDrawerDevice['config']['sensor_corr'])
        if (new_val > -5) {
          new_val -= 0.5
        }
        this.getDrawerDevice['client'].send('{"sensor_corr":"' + new_val + '" }')
      },
      onUpgradeFile() {
        window.open(`http://${this.getDrawerDevice['ip']}/manual_update`, '_blank');
      },
      onUpgrade() {
        this.getDrawerDevice['client'].send('{"files":{"ino_bin":"' + this.getDrawerDevice['config']['link'] + '"}}')
      },
      onClearHK() {
        this.getDrawerDevice['client'].send('{"clear_homekit":1}')
        setTimeout(() => {
          location.reload()
        }, 200)
      },
      onChangeHK(status) {
        this.rebootPreloader()
        if (status) {
          this.getDrawerDevice['client'].send('{"config":{"homekit":"1"}}')
        } else {
          this.getDrawerDevice['client'].send('{"config":{"homekit":"0"}}')
        }
      },
      onConnectExternarSensor() {
        if (this.mqtt_external_topic) {
          this.getDrawerDevice['client'].send('{"mqtt_external_topic":"' + this.mqtt_external_topic + '"}')
        } else {
          this.setSnackbar('Введите MQTT топик')
        }
      },
      onDisconnectExternarSensor() {
        this.getDrawerDevice['client'].send('{"mqtt_external":"disconnect"}')
        this.mqtt_external_topic = null
      },
      onChangeTargetTempFirst() {
        if (this.getDrawerDevice['config']['is_target_temp_first'] == 1) {
          this.getDrawerDevice['client'].send('{"is_target_temp_first":1}')
        } else {
          this.getDrawerDevice['client'].send('{"is_target_temp_first":0}')
        }
      },
      onConnectMqtt() {
        if (this.mqtt.server.length && this.mqtt.port.length) {
          this.rebootPreloader()
          if (this.mqtt.login.length && this.mqtt.pass.length) {
            this.getDrawerDevice['client']
              .send('{"mqtt_connect": {"mqtt_server":"' + this.mqtt.server + '","mqtt_port":"' + this.mqtt.port + '","mqtt_login":"' + this.mqtt.login + '","mqtt_password":"' + this.mqtt.pass + '"}}')
          } else {
            this.getDrawerDevice['client']
              .send('{"mqtt_connect": {"mqtt_server":"' + this.mqtt.server + '","mqtt_port":"' + this.mqtt.port + '","mqtt_login":"","mqtt_password":""}}')
          }
        } else {
          this.setSnackbar('Заполните все поля')
        }
      },
      onDisconnectMqtt() {
        this.getDrawerDevice['client'].send('{"mqtt_disconnect":1}')
        this.rebootPreloader()
      },
      onConnectAlice() {
        if (this.getDrawerDevice['config']['homekit'] != '0') {
          this.getDrawerDevice['client'].send('{"alice_connect":{"alice_login":"' + this.mqttAlice.login + '","alice_password":"' + this.mqttAlice.pass + '"}}')
          this.setSnackbar('Алиса подключена')
        }
      },
      onDisconnectAlice() {
        this.getDrawerDevice['client'].send('{"alice_disconnect":1}')
        this.setSnackbar('Алиса отключена')
        this.mqttAlice.login = null
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
      changeNexBl() {
        if (this.getDrawerDevice['config']['nex_bl'] != 0) {
          this.getDrawerDevice['client'].send('{"config":{"nex_bl":0}}')
        } else {
          this.getDrawerDevice['client'].send('{"config":{"nex_bl":100}}')
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
          location.reload()
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
  #Thermostat101Full {
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

      .thermostat_buttons {
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 6);
          .v-icon {
            font-size: calc(var(--percent-width) * 3);
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

      .thermostat_buttons {
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 9);
          .v-icon {
            font-size: calc(var(--percent-width) * 4);
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

      .thermostat_buttons {
        .button {
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 10);
          .v-icon {
            font-size: calc(var(--percent-width) * 5);
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

      .thermostat_buttons {
        .button {
          border-radius: var(--percent-width);
          height: calc(var(--percent-width) * 20);
          .v-icon {
            font-size: calc(var(--percent-width) * 10);
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