<template>
  <v-app>
    <v-main>
      <v-overlay :value="preloaderStatus" absolute>
        <v-progress-circular indeterminate size="64"/>
      </v-overlay>

      <v-snackbar v-model="snackbarStatus" absolute>
        {{ snackbarMessage }}
      </v-snackbar>

      <transition>
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'App',
    data: () => ({}),
    created() {
      this.startConnect()
    },
    computed: {
      ...mapGetters([
        'preloaderStatus',
        'snackbarStatus',
        'snackbarMessage',
      ])
    },
    methods: {
      ...mapActions([
        'startConnect'
      ]),
    }
  };
</script>

<style lang="scss">
  .theme--light.v-application {
    background: #232834 !important;
  }
  .theme--light.v-sheet {
    color: #50566f !important;
  }

  .vsheet {
    background: #232834 !important;
  }

  .pointer {
    cursor: pointer;
  }

  .temperature-text {
    font-weight: 400;
  }

  .color_lytko {
    color: #249fff;
  }
  .color_lytko_bg {
    background: #249fff;
  }

  .color_lytko2 {
    color: #464E70;
  }
  .color_lytko2_bg {
    background: #464E70;
  }

  .color_lytko3 {
    color: #202530;
  }
  .color_lytko3_bg {
    background: #202530;
  }

  .lytko_input {
    border-radius: 5px;
  }

  .w-100 {
    width: 100%;
  }
  .hw100 {
    height: 100%;
    width: 100%;
  }

  .relative {
    position: relative !important;
  }
  .absolute {
    position: absolute !important;
  }

  .dark_bg {
    background-color: #202530;
    border-radius: 7px;
  }

  .center_transform {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    -ms-transform: translate(-50%, -50%) !important;
    transform: translate(-50%, -50%) !important;
  }
</style>