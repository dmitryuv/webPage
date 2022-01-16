<template>
  <div id="header">
    <v-row class="d-flex d-sm-none ma-0">
      <v-col cols="3">
        <v-icon color="#249fff" @click="inDevelop">mdi-account-circle</v-icon>
      </v-col>
      <v-col cols="6" class="text-center">
          <span class="white--text px-3">Моя квартира</span>
      </v-col>
      <v-col cols="3">
        <div class="text-right">
          <v-icon color="#249fff" @click="inDevelop">mdi-cog</v-icon>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-none d-sm-flex ma-0">
      <v-col cols="5">
        <div class="d-flex align-center">
          <v-icon color="#249fff" @click="inDevelop">mdi-account-circle</v-icon>
          <span class="white--text px-3">Моя квартира</span>
          <v-icon color="#249fff" @click="inDevelop">mdi-cog</v-icon>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="text-center font-weight-bold">{{ $router.currentRoute.name }}</div>
      </v-col>
      <v-col cols="5">
        <div class="text-right">
          <v-icon>$HeaderLogo</v-icon>
          <span class="pl-3 font-weight-bold">Lytko Home</span>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: "Header",
    methods: {
      ...mapActions([
        'inDevelop',
      ])
    }
  }
</script>

<style lang="scss">
  #header {
    background: #2c3041;
  }
</style>