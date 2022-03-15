<template>
  <div id="sensor" :class="['relative device', selected?'selected':null, gridItem?'big':null]">
    <template v-if="device">
      <v-icon color="white" v-if="device.type === 'sensor_temp'">mdi-thermometer</v-icon>
      <v-icon color="white" v-if="device.type === 'sensor_hum'">mdi-water</v-icon>
      <div class="temperature white--text" v-if="device.type === 'sensor_temp'">
        {{ device.value }}&deg;C
      </div>
      <div class="humidity white--text" v-if="device.type === 'sensor_hum'">
        {{ device.value }}%
      </div>
    </template>
    <template v-else>
      <v-icon color="white">mdi-thermometer</v-icon>
      <div class="temperature white--text">
        24.6&deg;C
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: "Sensor",
    props: ['selected', 'device', 'gridItem'],
  }
</script>

<style lang="scss">
  #sensor {
    border: 1px solid #3a4056;
    border-radius: 9px;
    background: #2c3041;
    height: 100%;
    width: 100%;
    font-size: var(--percent-width);

    &.selected {
      border-color: #0455bf;
    }

    .v-icon {
      position: absolute;
      left: 0;
      top: calc(var(--percent-width) / 2.5);
      font-size: calc(var(--percent-width) * 1.2);
    }

    .temperature, .humidity {
      position: absolute;
      top: 50%;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }

    &.big {
      font-size: calc(var(--percent-width) * 2);
      .v-icon {
        top: calc(var(--percent-width) / 1.5);
        font-size: calc(var(--percent-width) * 1.8);
      }
    }
  }
</style>