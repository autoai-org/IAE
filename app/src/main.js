import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from './plugins/vuetify'
import store from './store'

Vue.config.productionTip = false

new Vue({
  Vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
