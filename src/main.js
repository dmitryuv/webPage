import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import router from './router'
import store from './store'

Vue.config.productionTip = false

document.documentElement.style.setProperty('--percent-width', (document.documentElement.clientWidth / 100) + 'px');
window.addEventListener('resize', function() {
  document.documentElement.style.setProperty('--percent-width', (document.documentElement.clientWidth / 100) + 'px');
}, true);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
