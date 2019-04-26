import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter.js'
import music from './modules/music.js'
import app from './modules/app.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    music,
    app
  },
  getters
})

export default store
