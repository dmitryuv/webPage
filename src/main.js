import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import router from './router'
import store from './store'

Vue.config.productionTip = false

document.documentElement.style.setProperty('--percent-width', Math.max((document.documentElement.clientWidth / 100), 4) + 'px');
window.addEventListener('resize', function() {
  document.documentElement.style.setProperty('--percent-width', Math.max((document.documentElement.clientWidth / 100), 4) + 'px');
}, true);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
