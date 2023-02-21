<template>
  <div id="Thermostat101" class="text-center">
    <div class="thermostat_title thermostat_title_overflow color_lytko pointer" @click="toggleDrawer(device)">{{ device['config']['name'] || '&nbsp;' }}</div>
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
        'toggleDrawer',
        'socketSend',
      ]),
      onHeating() {
        if (this.device['update']['heating'] === 'heat') {
          this.socketSend({id: this.device['id'], mess: '{"heating":0}'})
        } else {
          this.socketSend({id: this.device['id'], mess: '{"heating":1}'})
        }
      }
    }
  }
</script>

<style lang="scss">
  #Thermostat101 {
    @media (min-width: 1265px) {
      & {
        height: calc(var(--percent-width) * 14.33);
        width: calc(var(--percent-width) * 14.33);
        padding: var(--percent-width) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 1.3);
        line-height: calc(var(--percent-width) * 1.3);
        padding: 0 calc(var(--percent-width) * 1.3);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 3);
        padding: calc(var(--percent-width) * 0.8) 0;
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          background: #1f3c62;
          border-radius: calc(var(--percent-width) * 0.8);
          width: calc(var(--percent-width) * 5.2);
          height: calc(var(--percent-width) * 5.2);
          .v-icon {
            font-size: calc(var(--percent-width) * 3);
          }
        }
      }
    }

    @media (max-width: 1264px) {
      & {
        height: calc(var(--percent-width) * 17.6);
        width: calc(var(--percent-width) * 17.6);
        padding: var(--percent-width) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 1.5);
        line-height: calc(var(--percent-width) * 1.5);
        padding: 0 calc(var(--percent-width) * 1.5);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 4);
        padding: calc(var(--percent-width) * 0.9) 0;
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 6.5);
          height: calc(var(--percent-width) * 6.5);
          .v-icon {
            font-size: calc(var(--percent-width) * 4);
          }
        }
      }
    }

    @media (max-width: 960px) {
      & {
        height: calc(var(--percent-width) * 21);
        width: calc(var(--percent-width) * 21);
        padding: calc(var(--percent-width) * 1.5) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 1.9);
        line-height: calc(var(--percent-width) * 1.9);
        padding: 0 calc(var(--percent-width) * 1.9);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 4);
        padding: calc(var(--percent-width) * 1);
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 3);
        .button {
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 8.25);
          height: calc(var(--percent-width) * 8.25);
          .v-icon {
            font-size: calc(var(--percent-width) * 5);
          }
        }
      }
    }

    @media (max-width: 600px) {
      & {
        height: calc(var(--percent-width) * 28);
        width: calc(var(--percent-width) * 28);
        padding: calc(var(--percent-width) * 3) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 2);
        line-height: calc(var(--percent-width) * 2);
        padding: 0 calc(var(--percent-width) * 2);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 6);
        padding: var(--percent-width);
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          border-radius: calc(var(--percent-width) * 2);
          width: calc(var(--percent-width) * 10);
          height: calc(var(--percent-width) * 10);
          .v-icon {
            font-size: calc(var(--percent-width) * 6);
          }
        }
      }
    }

    .thermostat_title_overflow {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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