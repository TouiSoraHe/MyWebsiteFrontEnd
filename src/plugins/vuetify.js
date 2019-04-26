import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
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
    'github-circle': 'mdi-github-circle',
    'github': 'mdi-github-circle',
    'email': 'mdi-email',
    'telegram': 'mdi-telegram',
    'account': 'mdi-account',
    'qq': 'mdi-qqchat',
    'wechat': 'mdi-wechat'
  }
})
