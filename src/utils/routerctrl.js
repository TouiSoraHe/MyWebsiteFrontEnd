import router from '@/router/router.js'
import store from '@/store/store.js'

function setToBg(url) {
  store.commit('setHeadBgUrl', store.state.app.config.bgUrl[url] || store.state.app.config.bgUrl.default)
}

function setTitle(to) {
  if (to.meta.title) {
    document.title = to.meta.title
  }
}

router.beforeEach((to, from, next) => {
  setToBg(to.path)
  setTitle(to)
  next()
})

router.afterEach(() => {
})
