<template>
  <div id="Thermostat102" class="text-center">
    <div class="thermostat_title color_lytko pointer" @click="toggleDrawer(device)">{{ device['config']['name'] }}</div>
    <div class="temperature white--text temperature-text pointer" @click="toggleDrawer(device)">
      {{ device['update']['temp'] }}&deg;C
    </div>
    <div class="thermostat_buttons">
      <v-row class="ma-0">
        <v-col class="pa-0">
          <div class="button button_text pointer mx-auto" :class="device['update']['heating'] == 'off' ? null : 'active'" @click="onHeating">
            <v-icon v-if="device['update']['heating'] == 'off'" color="white">Auto</v-icon>
            <v-icon v-if="device['update']['heating'] == 'auto'" color="white">Auto</v-icon>
            <v-icon v-if="device['update']['heating'] == 'cool'" color="white">mdi-snowflake</v-icon>
            <v-icon v-if="device['update']['heating'] == 'heat'" color="white">mdi-fire</v-icon>
          </div>
        </v-col>
        <v-col class="pa-0">
          <div class="button button_icon pointer mx-auto" :class="parseInt(device['update']['fan_speed']) > 0 ? 'active' : ''" @click="onFunSpeed">
            <v-icon color="white">$Fun{{ device['update']['fan_speed'] }}</v-icon>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "Thermostat102",
    props: [
      'device',
    ],
    data: () => ({

    }),
    methods: {
      ...mapActions([
        'toggleDrawer'
      ]),
      onHeating() {
        switch (this.device['update']['heating']) {
          case 'off':
            this.device['client'].send('{"heating":1}')
            break
          case 'heat':
            this.device['client'].send('{"heating":2}')
            break
          case 'cool':
            this.device['client'].send('{"heating":3}')
            break
          case 'auto':
            this.device['client'].send('{"heating":0}')
            break
        }
      },
      onFunSpeed() {
        let speed = this.device['update']['fan_speed']
        if (speed < 5) {
          speed++
        } else {
          speed = 0
        }
        this.device['client'].send(`{"fan_speed":${speed}}`)
      }
    }
  }
</script>

<style lang="scss">
  #Thermostat102 {
    @media (min-width: 1265px) {
      & {
        height: calc(var(--percent-width) * 14.33);
        width: calc(var(--percent-width) * 14.33);
        padding: var(--percent-width) 0;
      }

      .thermostat_title {
        font-size: calc(var(--percent-width) * 1.3);
        line-height: calc(var(--percent-width) * 1.3);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 3);
        padding: calc(var(--percent-width) * 0.8) 0;
      }

      .thermostat_buttons {
        padding: 0 var(--percent-width);
        .button {
          background: #1f3c62;
          border-radius: calc(var(--percent-width) * 0.8);
          width: calc(var(--percent-width) * 5.2);
          height: calc(var(--percent-width) * 5.2);
        }
        .button_text .v-icon {
          font-size: calc(var(--percent-width) * 2);
        }
        .button_icon .v-icon svg {
          height: calc(var(--percent-width) * 2);
          width: calc(var(--percent-width) * 2);
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
      }

      .temperature {
        font-size: calc(var(--percent-width) * 4);
        padding: calc(var(--percent-width) * 0.9) 0;
      }

      .thermostat_buttons {
        padding: 0 var(--percent-width);
        .button {
          background: #1f3c62;
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 6.5);
          height: calc(var(--percent-width) * 6.5);
        }
        .button_text .v-icon {
          font-size: calc(var(--percent-width) * 2.5);
        }
        .button_icon .v-icon svg {
          height: calc(var(--percent-width) * 3);
          width: calc(var(--percent-width) * 3);
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
      }

      .temperature {
        font-size: calc(var(--percent-width) * 4);
        padding: calc(var(--percent-width) * 1);
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 8.25);
          height: calc(var(--percent-width) * 8.25);
        }
        .button_text .v-icon {
          font-size: calc(var(--percent-width) * 3);
        }
        .button_icon .v-icon svg {
          height: calc(var(--percent-width) * 4);
          width: calc(var(--percent-width) * 4);
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
        }
        .button_text .v-icon {
          font-size: calc(var(--percent-width) * 5);
        }
        .button_icon .v-icon svg {
          height: calc(var(--percent-width) * 7);
          width: calc(var(--percent-width) * 7);
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
          font-style: inherit;
        }
      }
    }
  }
</style>