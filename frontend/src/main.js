import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@morioh/v-msg/dist/msg.min.css';
import msg from '@morioh/v-msg';
import dotenv from 'dotenv';

dotenv.config();
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  msg,
  render: h => h(App)
}).$mount('#app')
