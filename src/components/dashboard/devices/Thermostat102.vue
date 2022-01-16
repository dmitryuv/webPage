<template>
  <div id="Thermostat101" class="text-center">
    <div class="thermostat_title color_lytko">{{ device.name }}</div>
    <div class="temperature white--text font-weight-bold">{{ device['update']['temp'] }} &deg;C</div>
    <div class="thermostat_buttons">
      <div class="d-inline-block float-left button white--text" :class="device['update']['relay'] ? 'active' : ''">
        <span>Auto</span>
      </div>
      <div class="d-inline-block float-left button">
        <v-icon>$Fun0</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Thermostat102",
    props: [
      'device',
    ]
  }
</script>

<style lang="scss">
  #Thermostat101 {
    @media (min-width: 1265px) {
      & {
        height: calc(var(--percent-width) * 18);
        width: calc(var(--percent-width) * 18);
      }

      .thermostat_title {
        padding-top: var(--percent-width);
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
          width: calc(var(--percent-width) * 6);
          height: calc(var(--percent-width) * 6);
          &:first-child {
            margin-right: calc(var(--percent-width) * 2);
          }
          span {
            font-size: calc(var(--percent-width) * 2);
            .v-icon__component {
              height: calc(var(--percent-width) * 3);
              width: calc(var(--percent-width) * 3);
            }
          }
        }
      }
    }

    @media (max-width: 1264px) {
      & {
        height: calc(var(--percent-width) * 23);
        width: calc(var(--percent-width) * 23);
      }

      .thermostat_title {
        padding-top: var(--percent-width);
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
          width: calc(var(--percent-width) * 9);
          height: calc(var(--percent-width) * 9);
          &:first-child {
            margin-right: var(--percent-width);
          }
          span {
            font-size: calc(var(--percent-width) * 3);
            .v-icon__component {
              height: calc(var(--percent-width) * 5);
              width: calc(var(--percent-width) * 5);
            }
          }
        }
      }
    }

    @media (max-width: 960px) {
      & {
        height: calc(var(--percent-width) * 30);
        width: calc(var(--percent-width) * 30);
      }

      .thermostat_title {
        padding-top: calc(var(--percent-width) * 2);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 6);
        padding: calc(var(--percent-width) * 2);
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 3);
        .button {
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 10);
          height: calc(var(--percent-width) * 10);
          &:first-child {
            margin-right: calc(var(--percent-width) * 4);
          }
          span {
            font-size: calc(var(--percent-width) * 4);
            .v-icon__component {
              height: calc(var(--percent-width) * 6);
              width: calc(var(--percent-width) * 6);
            }
          }
        }
      }
    }

    @media (max-width: 600px) {
      & {
        height: calc(var(--percent-width) * 46);
        width: calc(var(--percent-width) * 46);
      }

      .thermostat_title {
        padding-top: calc(var(--percent-width) * 2);
      }

      .temperature {
        font-size: calc(var(--percent-width) * 8);
        padding: calc(var(--percent-width) * 2);
      }

      .thermostat_buttons {
        padding: 0 calc(var(--percent-width) * 2);
        .button {
          border-radius: var(--percent-width);
          width: calc(var(--percent-width) * 20);
          height: calc(var(--percent-width) * 20);
          &:first-child {
            margin-right: calc(var(--percent-width) * 2);
          }
          span {
            font-size: calc(var(--percent-width) * 6);
            .v-icon__component {
              height: calc(var(--percent-width) * 10);
              width: calc(var(--percent-width) * 10);
            }
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
        span {
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