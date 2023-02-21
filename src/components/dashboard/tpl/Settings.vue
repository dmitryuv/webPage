<template>
  <div>
    <div class="d-flex align-center justify-space-between drawer_title white--text">
      <div class="d-flex align-center">
        <v-icon color="#249fff" @click="back()" class="mr-2">mdi-arrow-left</v-icon>
        <div v-if="getSettingsPage==0">Настройки</div>
        <div v-else>{{ title }}</div>
      </div>
    </div>

    <div class="drawer_body">
      <div class="dialog" v-if="getSettingsPage === 0">
        <ItemMenu :text="'Аккаунт'" @click.native="changePage(1, 'Аккаунт')"/>
        <div class="mb-2"></div>
      </div>

      <div class="dialog" v-if="getSettingsPage === 1">
        <v-btn dark>
          <a href="https://oauth.lytko.com/reg" target="_blank">Регистрация</a>
        </v-btn>
        <div class="mb-2"></div>
        <div>
          <v-btn dark>
            <a href="https://oauth.lytko.com/restore" target="_blank">Восстановление пароля</a>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ItemMenu from "../tpl/ItemMenu"

  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Settings",
    components: {ItemMenu},
    data: () => ({
      title: ''
    }),
    computed: {
      ...mapGetters([
        'getSettingsPage'
        ])
    },
    methods: {
      ...mapActions([
        'hideSettings',
        'setSettingsPage',
      ]),
      changePage(page, title) {
        this.setSettingsPage(page)
        this.title = title
      },
      back() {
        if(this.getSettingsPage == 0)
          this.hideSettings()
        else
          this.setSettingsPage(0)
      }
    }
  }
</script>

<style lang="scss">
  #header {
    background: #2c3041;
  }
</style>