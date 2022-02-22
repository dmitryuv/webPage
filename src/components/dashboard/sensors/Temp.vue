<template>
  <div id="tempSensor" class="relative">
    <v-icon color="white">mdi-thermometer</v-icon>
    <div class="temperature white--text">
      {{ sensor['value'] }}&deg;C
    </div>
  </div>
</template>

<script>
  export default {
    name: "Temp",
    props: [
      'sensor',
    ],
  }
</script>

<style lang="scss">
  #tempSensor {
    @media (min-width: 1265px) {
      & {
        height: calc(var(--percent-width) * 6.1);
        width: calc(var(--percent-width) * 6.1);
        padding: var(--percent-width) 0;
        font-size: calc(var(--percent-width) * 1.25);
        .v-icon {
          top: calc(var(--percent-width) / 2);
          font-size: calc(var(--percent-width) * 1.5);
        }
      }
    }
    @media (max-width: 1264px) {
      & {
        height: calc(var(--percent-width) * 7.75);
        width: calc(var(--percent-width) * 7.75);
        padding: calc(var(--percent-width) * 2) 0;
        font-size: calc(var(--percent-width) * 1.5);
        .v-icon {
          top: var(--percent-width);
          font-size: calc(var(--percent-width) * 2);
        }
      }
    }
    @media (max-width: 960px) {
      & {
        height: calc(var(--percent-width) * 8.75);
        width: calc(var(--percent-width) * 8.75);
        padding: calc(var(--percent-width) * 2.5) 0;
        font-size: calc(var(--percent-width) * 2);
        .v-icon {
          top: calc(var(--percent-width) * 0.75);
          font-size: calc(var(--percent-width) * 2.5);
        }
      }
    }
    @media (max-width: 600px) {
      & {
        height: calc(var(--percent-width) * 12);
        width: calc(var(--percent-width) * 12);
        padding: calc(var(--percent-width) * 3) 0;
        font-size: calc(var(--percent-width) * 2.5);
        .v-icon {
          top: calc(var(--percent-width) * 1.25);
          font-size: calc(var(--percent-width) * 3);
        }
      }
    }

    .v-icon {
      position: absolute;
      left: 0;
    }

    .temperature {
      position: absolute;
      top: 50%;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }
</style>