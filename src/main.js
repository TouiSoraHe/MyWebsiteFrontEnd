import Vue from 'vue'
import App from './App.vue'
import router from 'assets/js/router'
import element from 'assets/js/elementConfig'
import axios from 'assets/js/axiosConfig'
import other from 'assets/js/otherConfig'

import 'normalize.css/normalize.css'
import 'assets/css/milligram.min.css'
import 'assets/icon/iconfont.css'
import 'assets/css/global.css'

Vue.config.productionTip = false;

element.init();
axios.init();
other.init();

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');