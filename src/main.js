import 'normalize.css/normalize.css'
import 'assets/css/milligram.min.css'
import 'assets/css/global.css'

import Vue from 'vue'
import router from '@/router/router.js'
import store from '@/store/store.js'
import App from './App.vue'

import 'assets/js/vuetifyConfig'
import 'assets/js/axiosConfig'
import 'assets/js/otherConfig'
import '@/utils/utils.js'
import '@/utils/routerctrl.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
