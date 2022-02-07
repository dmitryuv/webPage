<template>
  <div id="Sensor" class="d-inline-block float-left">
    <Temp v-if="sensor.type === 'sensor_temp'" :sensor="sensor"/>
    <Hum v-if="sensor.type === 'sensor_hum'" :sensor="sensor"/>
  </div>
</template>

<script>
  import Temp from "./Temp";
  import Hum from "./Hum";

  export default {
    name: "Sensor",
    components: {
      Temp,
      Hum,
    },
    props: ['sensor'],
  }
</script>

<style lang="scss">
  #Sensor {
    background: #2c3041;
    border: 0;

    @media (min-width: 1265px) {
      & {
        margin: var(--percent-width);
        border-radius: var(--percent-width);
      }
    }
    @media (max-width: 1264px) {
      & {
        margin: calc(var(--percent-width) * 1);
        border-radius: calc(var(--percent-width) * 2);
      }
    }
    @media (max-width: 960px) {
      & {
        margin: calc(var(--percent-width) * 1.6);
        border-radius: calc(var(--percent-width) * 3);
      }
    }
    @media (max-width: 600px) {
      & {
        margin: calc(var(--percent-width) * 2);
        border-radius: calc(var(--percent-width) * 4);
      }
    }
  }
</style>