import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'
import './assets/icon/iconfont.css'
import './assets/css/global.css'
import Highlight from './assets/js/highlight.js'
import {
    Menu,
    MenuItem,
    Header,
    Main,
    Footer,
    Col,
    Row
} from 'element-ui';

Vue.config.productionTip = false;

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Col);
Vue.use(Row);

Vue.use(Highlight)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');