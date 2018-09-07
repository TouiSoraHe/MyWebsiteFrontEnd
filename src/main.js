import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import hljs from 'highlight.js'
import 'normalize.css/normalize.css'
import 'assets/css/tent.min.css'
import 'assets/icon/iconfont.css'
import 'highlight.js/styles/monokai-sublime.css'
import 'assets/css/global.css'

import {
    Menu,
    MenuItem,
    Header,
    Main,
    Footer,
    Col,
    Row,
    Message,
    Loading
} from 'element-ui';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.highlight = function() {
    let blocks = document.querySelectorAll('pre code');
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    });
};

Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Col);
Vue.use(Row);

Vue.use(Loading.directive);

Vue.prototype.$message = Message;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');