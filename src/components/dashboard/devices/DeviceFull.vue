<template>
  <div id="DeviceFull">
    <Thermostat101Full v-if="getDrawerDevice.type === 'esp8266_thermostat'"/>
    <Thermostat102Full v-if="getDrawerDevice.type === 'esp8266_air'"/>
  </div>
</template>

<script>
  import Thermostat101Full from "./Thermostat101Full";
  import Thermostat102Full from "./Thermostat102Full";

  import {mapGetters} from 'vuex'

  export default {
    name: "DeviceFull",
    components: {
      Thermostat101Full,
      Thermostat102Full,
    },
    computed: {
      ...mapGetters([
        'getDrawerDevice'
      ])
    },
  }
</script>