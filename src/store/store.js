import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter.js'
import user from './modules/user.js'
import app from './modules/app.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    app
  },
  getters
})

export default store
