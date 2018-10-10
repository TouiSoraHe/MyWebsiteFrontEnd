require('vuetify/src/stylus/app.styl');
import '@mdi/font/css/materialdesignicons.css';

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
import VAvatar from 'vuetify/es5/components/VAvatar';
import VForm from 'vuetify/es5/components/VForm';
import VTextField from 'vuetify/es5/components/VTextField';
import VSelect from 'vuetify/es5/components/VSelect';
import VCheckbox from 'vuetify/es5/components/VCheckbox';
import VTextarea from 'vuetify/es5/components/VTextarea';
import VDialog from 'vuetify/es5/components/VDialog';
import VPagination from 'vuetify/es5/components/VPagination';
import VTooltip from 'vuetify/es5/components/VTooltip';
import { Resize, Scroll, } from 'vuetify/es5/directives';

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
        VHover,
        VAvatar,
        VForm,
        VTextField,
        VSelect,
        VCheckbox,
        VTextarea,
        VDialog,
        VPagination,
        VTooltip,
    },
    directives: {
        Resize,
        Scroll,
    },
    iconfont: 'mdi',
    icons: {
        'home': 'mdi-home',
        'blogger': 'mdi-blogger',
        'archive': 'mdi-archive',
        'music': 'mdi-library-music',
        'message': 'mdi-message',
        'menu': 'mdi-menu',
        'calendar': 'mdi-calendar',
        'title': 'mdi-title',
        'file-word': 'mdi-file-word',
        'eye': 'mdi-eye',
        'arrow-up': 'mdi-arrow-up',
        'github-circle':'mdi-github-circle',
        'email':'mdi-email',
        'telegram':'mdi-telegram',
    },
});