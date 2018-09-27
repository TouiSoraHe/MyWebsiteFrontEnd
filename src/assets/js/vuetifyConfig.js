require('vuetify/src/stylus/app.styl')
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Vue from 'vue';
import Vuetify from 'vuetify/es5/components/Vuetify';
import VApp from 'vuetify/es5/components/VApp';
import VBtn from 'vuetify/es5/components/VBtn';
import VGrid from 'vuetify/es5/components/VGrid';
import VIcon from 'vuetify/es5/components/VIcon';
import VToolbar from 'vuetify/es5/components/VToolbar';
import VCard from 'vuetify/es5/components/VCard';
import VNavigationDrawer from 'vuetify/es5/components/VNavigationDrawer';
import VList from 'vuetify/es5/components/VList';
import VDivider from 'vuetify/es5/components/VDivider';
import VImg from 'vuetify/es5/components/VImg';
import VHover from 'vuetify/es5/components/VHover';
import { Resize,Scroll } from 'vuetify/es5/directives';

Vue.use(Vuetify, {
    components: {
        VApp,
        VBtn,
        VCard,
        VGrid,
        VIcon,
        VToolbar,
        VNavigationDrawer,
        VList,
        VDivider,
        VImg,
        VHover
    },
    directives: {
        Resize,
        Scroll
    }
});