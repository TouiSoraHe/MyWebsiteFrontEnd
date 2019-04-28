
const app = {
  state: {
    isMobile: false,
    windowSize: {
      x: 0,
      y: 0
    },
    scrollTop: 0,
    user: {},
    layoutRatio: {
      xs: [0, 12, 0, 0],
      sm: [0, 12, 0, 0],
      md: [1, 7, 3, 1],
      lg: [1, 7, 3, 1],
      xl: [2, 5, 3, 2]
    },
    config: {
      bgUrl: {
        'default': ''
      },
      BloggerInfo: {
        name: '遠空',
        email: '',
        contactInformation: {
        }
      }
    },
    headBgUrl: ''
  },
  mutations: {
    setIsMobile(state, newValue) {
      state.isMobile = newValue
    },
    setWindowSize(state, newValue) {
      state.windowSize = newValue
    },
    setScrollTop(state, newValue) {
      state.scrollTop = newValue
    },
    setUser(state, newValue) {
      state.user = newValue
    },
    setLayoutRatio(state, newValue) {
      state.layoutRatio = newValue
    },
    setHeadBgUrl(state, newValue) {
      state.headBgUrl = newValue
    },
    setConfig(state, newValue) {
      Object.assign(state.config, newValue)
    }
  },
  actions: {
  }
}

export default app
