<template>
  <div id="dashboard">
    <v-sheet class="vsheet" style="position: relative; height: 100vh;">
      <v-navigation-drawer :value="getDrawerStatus" absolute right overlay-opacity="0.4" class="drawer">
        <div class="d-flex align-center justify-space-between drawer_title white--text">
          <div class="d-flex align-center">
            <v-icon color="#249fff" @click="back()" class="mr-2">mdi-arrow-left</v-icon>
            <div>{{ getDrawerTitle }}</div>
          </div>
          <v-icon v-if="getDrawerDialog === 0" color="#249fff" @click="changeDrawerDialog([1, 'Настройки'])" class="float-right">mdi-cog</v-icon>
        </div>

        <div class="drawer_body" v-if="getDrawerDevice">
          <DeviceFull/>
        </div>
      </v-navigation-drawer>

      <Header/>

      <div class="devices">
        <div class="filters my-4 text-sm-center pr-8">
          <v-icon color="#249fff" @click="inDevelop">mdi-tune</v-icon>
          <v-chip class="ml-2" color="#2c3041" text-color="white" @click="inDevelop">Все устройства</v-chip>
        </div>
        <div class="room_title d-flex align-center">
          <div class="room_name">КОМНАТА</div>
          <v-icon color="white">mdi-chevron-right</v-icon>
          <div class="devices_count">{{ devicesLengthText }}</div>
        </div>

        <div class="sensors" v-if="sensors.length">

        </div>
        <div class="thermostats" v-if="Object.keys(getThermostats).length">
          <Device v-for="thermostat in getThermostats" :key="thermostat.id" :device="thermostat"/>
        </div>
        <div class="switchers" v-if="switchers.length">

        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
  import Header from "./tpl/Header";
  import Device from "./devices/Device";
  import DeviceFull from "./devices/DeviceFull";

  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Dashboard",
    components: {Header, Device, DeviceFull},
    data() {
      return {
        sensors: [],
        switchers: [],
      }
    },
    computed: {
      ...mapGetters([
        'getClients',
        'getThermostats',
        'getDrawerStatus',
        'getDrawerTitle',
        'getDrawerDevice',
        'getDrawerDialog',
        'getDrawerWfsn',
      ]),
      devicesLength() {
        return Object.keys(this.getClients).length
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
      }
    }
  }
</script>

<style lang="scss">
  #dashboard {
    font-family: 'Noto Sans', sans-serif;
    color: #50566f;

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