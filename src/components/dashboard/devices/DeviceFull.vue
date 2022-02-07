<template>
  <div id="DeviceFull">
    <Thermostat101Full v-if="getDrawerDevice.type === 'esp8266_thermostat'"/>
    <Thermostat101Full v-if="getDrawerDevice.type === 'esp8266_thermostat_plus'"/>
    <Thermostat102Full v-if="getDrawerDevice.type === 'esp8266_air'"/>
    <Thermostat103Full v-if="getDrawerDevice.type === 'esp32_panel_4inch'"/>
  </div>
</template>

<script>
  import Thermostat101Full from "./Thermostat101Full";
  import Thermostat102Full from "./Thermostat102Full";
  import Thermostat103Full from "./Thermostat103Full";

  import {mapGetters} from 'vuex'

  export default {
    name: "DeviceFull",
    components: {
      Thermostat101Full,
      Thermostat102Full,
      Thermostat103Full,
    },
    computed: {
      ...mapGetters([
        'getDrawerDevice'
      ])
    },
  }
</script>