import Vue from 'vue'

const store = {
  debug: true,
  state: {
    // 判断是否为手机端,在APP.vue中设置
    isMobile: false,
    // 窗口大小,在APP.vue中设置
    windowSize: {
      x: 0,
      y: 0
    },
    // 距离顶部的距离,在APP.vue中设置
    scrollTop: 0,
    // 当前访问页面的用户的信息,在APP.vue中设置
    user: {},
    // 布局管理，数组分别代表 左边空白区域 内容区 右侧边栏 右边空白区域
    layoutRatio: {
      xs: [0, 12, 0, 0],
      sm: [0, 12, 0, 0],
      md: [1, 7, 3, 1],
      lg: [1, 7, 3, 1],
      xl: [2, 5, 3, 2]
    },
    // 代表项目的配置信息，该信息仅能在此设置，不能在其他地方修改
    config: {
      defaultHeadBgUrl: 'https://ws1.sinaimg.cn/large/006nw0Eagy1g0yvwlazhuj31z40nx47d.jpg',
      indexHeadBgUrl: undefined,
      blogHeadBgUrl: undefined,
      archiveHeadBgUrl: undefined,
      musicHeadBgUrl: undefined,
      messageHeadBgUrl: undefined,
      BloggerInfo: {
        BloggerName: '遠空',
        BloggerAvatar: 'http://p2.music.126.net/OpgpNNPKznDDMxoBqVJy-Q==/2464005557906815.jpg',
        contactInformation: {
        }
      }
    },
    headBgUrl: ''
  },

  setIsMobile(newValue) {
    if (this.debug) console.log('setIsMobileAction triggered with', newValue)
    this.state.isMobile = newValue
  },
  getIsMobile() {
    if (this.debug) console.log('getIsMobile triggered')
    return this.state.isMobile
  },

  setWindowSize(newValue) {
    if (this.debug) console.log('setWindowSize triggered with', newValue)
    this.state.windowSize = newValue
  },
  getWindowSize() {
    if (this.debug) console.log('getIsMobile triggered')
    return this.state.windowSize
  },

  setScrollTop(newValue) {
    // if (this.debug) console.log('setScrollTop triggered with', newValue);
    this.state.scrollTop = newValue
  },
  getScrollTop() {
    // if (this.debug) console.log('getScrollTop triggered');
    return this.state.scrollTop
  },

  setUser(newValue) {
    if (this.debug) console.log('setUser triggered with', newValue)
    this.state.user = newValue
  },
  getUser() {
    if (this.debug) console.log('getUser triggered')
    return this.state.user
  },

  setLayoutRatio(newValue) {
    if (this.debug) console.log('setLayoutRatio triggered with', newValue)
    this.state.layoutRatio = newValue
  },
  getLayoutRatio() {
    if (this.debug) console.log('getLayoutRatio triggered')
    return this.state.layoutRatio
  },

  getConfig() {
    if (this.debug) console.log('getConfig triggered')
    return this.state.config
  },

  setHeadBgUrl(newValue) {
    if (this.debug) console.log('setHeadBgUrl triggered with', newValue)
    this.state.headBgUrl = newValue
  },
  getHeadBgUrl() {
    if (this.debug) console.log('getHeadBgUrl triggered')
    return this.state.headBgUrl
  }
}

Vue.prototype.$store = store

export default store
