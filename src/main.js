import 'normalize.css/normalize.css'
import 'assets/css/milligram.min.css'
// import 'assets/icon/iconfont.css'
import 'assets/css/global.css'

import Vue from 'vue'
import App from './App.vue'
import router from 'assets/js/router'
import 'assets/js/vuetifyConfig'
import axios from 'assets/js/axiosConfig'
import other from 'assets/js/otherConfig'

Vue.config.productionTip = false;

axios.init();
other.init();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');