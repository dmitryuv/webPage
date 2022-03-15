<template>
  <div id="conditioner" :class="['device relative', 'size'+size, selected?'selected':null]">
    <v-row class="header ma-0">
      <v-col class="pa-0 text-left">
        <v-icon color="#777981">mdi-fire</v-icon>
      </v-col>
      <v-col class="pa-0 text-center">Auto</v-col>
      <v-col class="pa-0 text-right">
        <v-icon color="#777981">mdi-snowflake</v-icon>
      </v-col>
    </v-row>
    <div class="text-center white--text">
      <div class="current_temp">{{ device ? device['update']['temp'] : '23.5' }}&deg;</div>
      <div class="chevron">
        <v-icon color="white">mdi-chevron-up</v-icon>
      </div>
      <div class="target_temp">{{ device ? device['update']['target_temp'] : '23.5' }}&deg;</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Conditioner",
    props: ['size', 'selected', 'device'],
  }
</script>

<style lang="scss">
  #conditioner {
    border: 1px solid #4b5067;
    border-radius: 9px;
    width: 100%;
    height: 100%;

    &.selected {
      border-color: #0455bf;
    }

    .header {
      padding: var(--percent-width);
      font-size: calc(var(--percent-width) * 1.5);
      line-height: calc(var(--percent-width) * 1.5);
      .v-icon {
        font-size: calc(var(--percent-width) * 1.5);
      }
    }
    .current_temp {
      margin-top: calc(var(--percent-width) * 1);
      font-size: calc(var(--percent-width) * 2);
      line-height: calc(var(--percent-width) * 2);
    }
    .chevron {
      line-height: calc(var(--percent-width) * 2);
      .v-icon {
        font-size: calc(var(--percent-width) * 2);
      }
    }
    .target_temp {
      font-size: calc(var(--percent-width) * 5);
      line-height: calc(var(--percent-width) * 5);
    }

    &.size2 {
      .header {
        padding: 3px !important;
        font-size: 13px;
        line-height: 16px;
        .v-icon {
          font-size: 16px;
        }
      }
      .current_temp {
        margin-top: 7px;
        font-size: 13px;
        line-height: 13px;
      }
      .chevron {
        line-height: 16px;
        .v-icon {
          font-size: 16px;
        }
      }
      .target_temp {
        font-size: 30px;
        line-height: 30px;
      }
    }

    &.size3 {
      .header {
        padding: 3px !important;
        font-size: 16px;
        line-height: 24px;
        .v-icon {
          font-size: 24px;
        }
      }
      .current_temp {
        font-size: 13px;
        line-height: 13px;
      }
      .chevron {
        line-height: 24px;
        .v-icon {
          font-size: 24px;
        }
      }
      .target_temp {
        font-size: 40px;
        line-height: 40px;
      }
    }
  }
</style>