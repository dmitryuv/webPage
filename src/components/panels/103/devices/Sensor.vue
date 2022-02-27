<template>
  <div id="sensor" :class="['device', selected?'selected':null]">

  </div>
</template>

<script>
  export default {
    name: "Sensor",
    props: ['selected']
  }
</script>

<style lang="scss">
  #sensor {
    border: 1px solid #3a4056;
    border-radius: 9px;
    background: #2c3041;
    height: 100%;
    width: 100%;

    &.selected {
      border-color: #0455bf;
    }
  }
</style>