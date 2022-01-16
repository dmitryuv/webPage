<template>
  <div id="DeviceFull">
    <Thermostat101Full v-if="getDrawerDevice.type === 'esp8266_thermostat'"/>
  </div>
</template>

<script>
  import Thermostat101Full from "./Thermostat101Full";

  import {mapGetters} from 'vuex'

  export default {
    name: "DeviceFull",
    components: {
      Thermostat101Full,
    },
    computed: {
      ...mapGetters([
        'getDrawerDevice'
      ])
    },
  }
</script>