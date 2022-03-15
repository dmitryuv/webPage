<template>
  <div id="thermostat" class="text-center" :class="['device relative', 'size'+size, selected?'selected':null]">
    <div class="target_temp">{{ device ? device['update']['target_temp'] : '23.5' }}&deg;</div>
    <div class="current_temp">Сейчас {{ device ? device['update']['temp'] : '22' }}&deg;</div>
  </div>
</template>

<script>
  export default {
    name: "Thermostat",
    props: ['size', 'selected', 'device'],
  }
</script>

<style lang="scss">
  #thermostat {
    border: 1px solid #4b5067;
    border-radius: 9px;
    width: 100%;
    height: 100%;

    &.selected {
      border-color: #0455bf;
    }

    .target_temp {
      padding-top: calc(var(--percent-width) * 6);
      font-size: calc(var(--percent-width) * 4);
      line-height: calc(var(--percent-width) * 4);
    }

    .current_temp {
      font-size: calc(var(--percent-width) * 1);
      color: #818288;
    }

    &.size1 {
      .target_temp {
        padding-top: 16px;
        font-size: 30px;
        line-height: 30px;
      }

      .current_temp {
        font-size: 10px;
        color: #818288;
      }
    }

    &.size2 {
      .target_temp {
        padding-top: 34px;
        font-size: 40px;
      }

      .current_temp {
        padding-top: 8px;
        font-size: 13px;
        color: #818288;
      }
    }
  }
</style>