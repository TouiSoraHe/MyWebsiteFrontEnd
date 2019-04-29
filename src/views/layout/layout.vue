<template>
  <div v-resize="onResize" v-scroll="onScroll" class="appBackground">
    <header>
      <my-nav></my-nav>
    </header>
    <my-top-bg></my-top-bg>
    <main :style="myMainStyleObj" class="myMain">
      <v-container pa-0 ma-0 fluid>
        <v-layout>
          <v-flex :class="leftContentLayoutObj">
            <transition name="slide-x-transition" mode="out-in">
              <router-view :key="'left'+routerViewKey" name="left"></router-view>
            </transition>
          </v-flex>
          <v-flex v-if="!$store.state.app.isMobile" :class="rightContentLayoutObj" class="text-center">
            <div style="position:sticky;top:78px; margin-left: 30px;">
              <transition name="slide-x-transition" mode="out-in">
                <router-view :key="'right'+routerViewKey" name="right"></router-view>
              </transition>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <my-back-to-top></my-back-to-top>
    <aplayer
      ref="aplayer"
      fixed
      :volume="1"
      :audio="$store.state.music.playlist"
      @error="onMusicError"
    ></aplayer>
    <footer class="myFooter vertical-middle">
      <v-container pa-0 ma-0 fluid>
        <v-layout>
          <v-flex :class="footerContentLayoutObj" class="text-center">
            <div>(〃'▽'〃)</div>
          </v-flex>
        </v-layout>
      </v-container>
    </footer>
  </div>
</template>
<script type="text/javascript">
import nav from 'components/nav/nav.vue'
import top from 'components/backToTop/backToTop.vue'
import topBg from 'components/topBG/topBg.vue'
import Fingerprint2 from 'fingerprintjs2'

export default {
  components: {
    'my-nav': nav,
    'my-back-to-top': top,
    'my-top-bg': topBg
  },
  computed: {
    bloggerInfo() {
      return this.$store.state.app.config.BloggerInfo
    },
    layoutRatio() {
      return this.$store.state.app.layoutRatio
    },
    leftContentLayoutObj() {
      return [
        'xs' + this.layoutRatio.xs[1], 'offset-xs' + this.layoutRatio.xs[0],
        'sm' + this.layoutRatio.sm[1], 'offset-sm' + this.layoutRatio.sm[0],
        'md' + this.layoutRatio.md[1], 'offset-md' + this.layoutRatio.md[0],
        'lg' + this.layoutRatio.lg[1], 'offset-lg' + this.layoutRatio.lg[0],
        'xl' + this.layoutRatio.xl[1], 'offset-xl' + this.layoutRatio.xl[0]
      ]
    },
    rightContentLayoutObj() {
      return [
        'xs' + this.layoutRatio.xs[2],
        'sm' + this.layoutRatio.sm[2],
        'md' + this.layoutRatio.md[2],
        'lg' + this.layoutRatio.lg[2],
        'xl' + this.layoutRatio.xl[2]
      ]
    },
    footerContentLayoutObj() {
      return [
        'xs' + (this.layoutRatio.xs[1] + this.layoutRatio.xs[2]), 'offset-xs' + this.layoutRatio.xs[0],
        'sm' + (this.layoutRatio.sm[1] + this.layoutRatio.sm[2]), 'offset-sm' + this.layoutRatio.sm[0],
        'md' + (this.layoutRatio.md[1] + this.layoutRatio.md[2]), 'offset-md' + this.layoutRatio.md[0],
        'lg' + (this.layoutRatio.lg[1] + this.layoutRatio.lg[2]), 'offset-lg' + this.layoutRatio.lg[0],
        'xl' + (this.layoutRatio.xl[1] + this.layoutRatio.xl[2]), 'offset-xl' + this.layoutRatio.xl[0]
      ]
    },
    myMainStyleObj() {
      const styleObj = {
        'min-height': this.$store.state.app.windowSize.y + 'px'
      }
      if (!this.$store.state.app.isMobile) {
        styleObj['margin-top'] = '30px'
      }
      return styleObj
    },
    routerViewKey() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getFinger()
    })
  },
  created() {
    this.init()
  },
  beforeCreate() {
    const el = document.getElementById('appLoading')
    if (el !== null) {
      el.className += 'disappear'
      setTimeout(() => {
        document.body.removeChild(el)
      }, 300)
    }
  },
  methods: {
    async getFinger() {
      try {
        let userIdValue = localStorage.getItem('userid')
        if (userIdValue === undefined || userIdValue === null) {
          const components = await Fingerprint2.getPromise()
          var values = components.map(function(component) { return component.value })
          var murmur = Fingerprint2.x64hash128(values.join(''), 31)
          userIdValue = murmur
          localStorage.setItem('userid', userIdValue)
        }
        var finger = userIdValue
        const response = await this.$api.getUser(finger)
        this.$store.commit('setUser', response.data)
      } catch (error) {
        this.$store.commit('setUser', {
          id: finger,
          userName: undefined,
          email: undefined,
          avatar: undefined
        })
        console.error(error)
      }
    },
    async init() {
      try {
        // 获取config
        await this.getBloggerInfo()
        // 设置背景图
        this.$store.commit('setHeadBgUrl', this.$store.state.app.config.bgUrl[this.$route.path] || this.$store.state.app.config.bgUrl.default)
        // 获取音乐相关信息
        this.$store.commit('setBackendInfo', {
          uid: this.$store.state.app.config.musicInfo['uid']
        })
        await this.getMusicPlaylists()
        if (this.$store.state.music.playlists.length > 0) {
          await this.$store.dispatch('SwitchPlayList', this.$store.state.music.playlists[0].id)
        }
      } catch (error) {
        this.$tips.showTips({
          color: 'error',
          text: error.response ? error.response.data || error : error,
          timeout: 3000
        })
      }
    },
    async getBloggerInfo() {
      const response = await this.$api.getBloggerInfo()
      this.$store.commit('setConfig', response.data)
    },
    async getMusicPlaylists() {
      const response = await this.$store.dispatch('GetPlaylists')
      if (response.data.code === 200) {
        this.$store.commit('setPlaylists', response.data.playlist)
      }
    },
    onResize() {
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        this.$store.commit('setWindowSize', { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight })
      } else {
        this.$store.commit('setWindowSize', { x: window.innerWidth, y: window.innerHeight })
      }
      this.$store.commit('setIsMobile', this.$store.state.app.windowSize.x < 960)
    },
    onScroll() {
      this.$store.commit('setScrollTop', window.pageYOffset || document.documentElement.scrollTop || document.body.scrolltop || 0)
    },
    async onMusicError(e) {
      // 网易云音乐的音乐URL一段时间后会发生变化,此时需要重新获取URL连接
      try {
        console.error(e)
        await this.$store.dispatch('ResetPlaylist')
        this.$refs.aplayer.play()
      } catch (error) {
        this.$tips.showTips({
          color: 'error',
          text: error.response ? error.response.data || error : error,
          timeout: 3000
        })
      }
    }
  }
}
</script>
<style scoped>
.appBackground{
  background: url('./bg.png') repeat;
}

#app {
    background: none;
}

.myFooter {
    width: 100%;
    background-color: #232323;
    min-height: 60px !important;
    height: auto !important;
    color: #888;
}
</style>
