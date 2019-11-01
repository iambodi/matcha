import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
// import socketio from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';

// const SocketInstance = socketio.connect('http://localhost:5000');
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketInstance
// }));
// Vue.use(VueSocketIO, SocketInstance)

window.axios = require('axios');
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
