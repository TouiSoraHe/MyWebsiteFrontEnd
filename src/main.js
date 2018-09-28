import 'normalize.css/normalize.css'
import 'assets/css/milligram.min.css'
// import 'assets/icon/iconfont.css'
import 'assets/css/global.css'

import Vue from 'vue'
import 'assets/js/store.js'
import App from './App.vue'
import router from 'assets/js/router'
import 'assets/js/vuetifyConfig'
import 'assets/js/axiosConfig'
import 'assets/js/otherConfig'

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');