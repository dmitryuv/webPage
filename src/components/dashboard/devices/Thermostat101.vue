<template>
  <div id="Thermostat101" class="text-center">
    <div class="thermostat_title color_lytko pointer" @click="toggleDrawer(device)">{{ device['config']['name'] }}</div>
    <div class="temperature white--text temperature-text pointer" @click="toggleDrawer(device)">
      {{ device['update']['temp'] }}&deg;C
    </div>
    <div class="thermostat_buttons">
      <div class="button pointer mx-auto" :class="device['update']['heating'] === 'heat' ? 'active' : ''" @click="onHeating">
        <v-icon color="white">mdi-fire</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "Thermostat101",
    props: [
      'device',
    ],
    methods: {
      ...mapActions([
        'toggleDrawer'
      ]),
      onHeating() {
        if (this.device['update']['heating'] === 'heat') {
          this.device['client'].send('{"heating":0}')
        } else {
          this.device['client'].send('{"heating":1}')
        }
      }
    }
  }
</script>

<style lang="scss">
  #Thermostat101 {
    @media (min-width: 1265px) {
      & {
        height: calc(var(--percent-width) * 17.5);
        width: calc(var(--percent-width) * 17.5);
        padding: var(--percent-width) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 1.3);
        line-height: calc(var(--percent-width) * 1.3);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 4);
        padding: var(--percent-width) 0;
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 6.2);
          height: calc(var(--percent-width) * 6.2);
          .v-icon {
            font-size: calc(var(--percent-width) * 3);
          }
        }
      }
    }

    @media (max-width: 1264px) {
      & {
        height: calc(var(--percent-width) * 22.5);
        width: calc(var(--percent-width) * 22.5);
        padding: calc(var(--percent-width) * 2) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 1.5);
        line-height: calc(var(--percent-width) * 1.5);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 5);
        padding: var(--percent-width) 0;
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 8);
          height: calc(var(--percent-width) * 8);
          .v-icon {
            font-size: calc(var(--percent-width) * 4);
          }
        }
      }
    }

    @media (max-width: 960px) {
      & {
        height: calc(var(--percent-width) * 29);
        width: calc(var(--percent-width) * 29);
        padding: calc(var(--percent-width) * 2.5) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 1.9);
        line-height: calc(var(--percent-width) * 1.9);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 6);
        padding: calc(var(--percent-width) * 1.5);
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 3);
        .button {
          border-radius: calc(var(--percent-width) * 2);
          width: calc(var(--percent-width) * 10.5);
          height: calc(var(--percent-width) * 10.5);
          .v-icon {
            font-size: calc(var(--percent-width) * 5);
          }
        }
      }
    }

    @media (max-width: 600px) {
      & {
        height: calc(var(--percent-width) * 44);
        width: calc(var(--percent-width) * 44);
        padding: calc(var(--percent-width) * 3) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 3);
        line-height: calc(var(--percent-width) * 3);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 8);
        padding: calc(var(--percent-width) * 2);
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          border-radius: calc(var(--percent-width) * 2);
          width: calc(var(--percent-width) * 18);
          height: calc(var(--percent-width) * 18);
          .v-icon {
            font-size: calc(var(--percent-width) * 10);
          }
        }
      }
    }

    .thermostat_buttons {
      .button {
        background: #1f3c62;
        position: relative;
        &.active {
          background: #035cd0;
        }
        .v-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
        }
      }
    }
  }
</style>