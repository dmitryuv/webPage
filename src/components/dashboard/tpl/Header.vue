<template>
  <div id="header">
    <v-row class="d-flex d-sm-none ma-0">
      <v-col cols="3">
        <v-icon color="#249fff" @click="inDevelop">mdi-account-circle</v-icon>
      </v-col>
      <v-col cols="6" class="text-center">
        <span class="white--text px-3">Моя квартира</span>
      </v-col>
      <v-col cols="3">
      </v-col>
    </v-row>
    <v-row class="d-none d-sm-flex ma-0">
      <v-col cols="5">
        <div class="d-flex align-center">
          <v-icon color="#249fff" @click="inDevelop">mdi-account-circle</v-icon>
          <span class="white--text px-3">Моя квартира</span>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="text-center font-weight-bold">Главная</div>
      </v-col>
      <v-col cols="5">
        <div class="text-right">
          <v-icon color="#249fff" size="26" class="mr-4" @click="onUpgradeModal">mdi-update</v-icon>
          <v-icon>$HeaderLogo</v-icon>
          <span class="pl-3 font-weight-bold">Lytko Home</span>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="upgrade_dialog" max-width="800" dark>
      <v-card>
        <v-card-title class="text-h5">
          Обновление устройств
        </v-card-title>

        <v-card-text>
          <v-row v-for="(device, id) in getClients" :key="id" class="border_bottom">
            <v-col v-if="device.config">
              <div><b>ID:</b> {{ id }} ({{ device.config.name }})</div>
              <div>Версия: {{ device.config.version }}</div>
            </v-col>
            <v-col v-if="device.config">
              <div class="font-weight-bold">Контроллер</div>
              <div v-if="device.config.version_new">{{'Доступна версия: ' + device.config.version_new }}
                <v-icon class="pointer" @click="onUpgrade(device)">mdi-download</v-icon>
              </div>
              <div v-else>Нет доступных обновлений</div>
            </v-col>
            <v-col v-if="device.config">
              <div class="font-weight-bold">Монитор</div>
              <div v-if="device.config.dwin_version_new">{{'Доступна версия: ' + device.config.dwin_version_new }}
                <v-icon class="pointer" @click="onUpgradeDwin(device)">mdi-download</v-icon>
              </div>
              <div v-else>Нет доступных обновлений</div>
            </v-col>
            <v-col cols="12" v-if="device.update_status">
              <div>Идет обновление. Не перезагружайте устройство.</div>
              <v-progress-linear :value="device.update_status"></v-progress-linear>
              <div v-if="device.update_status === '100'">перезагрузка устройства...</div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="green darken-1" text @click="upgrade_dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Header",
    data: () => ({
      panelConfig: false,
      upgrade_dialog: false
    }),
    computed: {
      ...mapGetters([
        'getClients'
      ])
    },
    methods: {
      ...mapActions([
        'inDevelop',
        'socketSend',
      ]),
      onUpgradeModal() {
        this.upgrade_dialog = !this.upgrade_dialog
      },
      onUpgrade(device) {
        this.socketSend({id: device.id, mess: '{"files":{"ino_bin":"' + device.config.link + '"}}'})
      },
      onUpgradeDwin(device) {
        this.socketSend({id: device.id, mess: '{"files":{"dwin_link":"' + device.config.dwin_link + '"}}'})
      }
    }
  }
</script>

<style lang="scss">
  #header {
    background: #2c3041;
  }
</style>