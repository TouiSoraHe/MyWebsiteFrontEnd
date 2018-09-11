import Vue from 'vue'
import {
    Menu,
    MenuItem,
    Container,
    Header,
    Main,
    Footer,
    Col,
    Row,
    Message,
    Loading
} from 'element-ui';

export default{
    init:function(){
        Vue.use(Menu);
        Vue.use(MenuItem);
        Vue.use(Container);
        Vue.use(Header);
        Vue.use(Main);
        Vue.use(Footer);
        Vue.use(Col);
        Vue.use(Row);

        Vue.prototype.$message = Message;
        Vue.prototype.$loading = Loading.service;
    },
}