<template>
  <v-app id="app" v-resize="onResize" v-scroll="onScroll">
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
    <footer class="myFooter vertical-middle">
      <v-container pa-0 ma-0 fluid>
        <v-layout>
          <v-flex :class="footerContentLayoutObj" class="text-center">
            <div>(〃'▽'〃)</div>
          </v-flex>
        </v-layout>
      </v-container>
    </footer>
  </v-app>
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
  created() {
    this.getBloggerInfo()
  },
  mounted() {
    this.$nextTick(() => {
      this.getFinger()
    })
  },
  beforeCreate() {
    console.log(123)
    console.log(this)

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
      function getFinger() {
        return new Promise((resolve) => {
          const userIdKey = 'userid'
          let userIdValue = localStorage.getItem(userIdKey)
          if (userIdValue === undefined || userIdValue === null) {
            Fingerprint2().get((result) => {
              userIdValue = result
              localStorage.setItem(userIdKey, userIdValue)
              resolve(userIdValue)
            })
          } else {
            resolve(userIdValue)
          }
          console.log(localStorage.getItem('test'))
        })
      }
      try {
        var finger = await getFinger()
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
    async getBloggerInfo() {
      try {
        const response = await this.$api.getBloggerInfo()
        const bloggerInfo = response.data
        if (bloggerInfo) {
          this.bloggerInfo.BloggerName = bloggerInfo.username || this.bloggerInfo.BloggerName
          if (bloggerInfo.email) {
            this.bloggerInfo.BloggerAvatar = this.$getGravatar(bloggerInfo.email)
          }
          if (bloggerInfo.contactInformation) {
            Object.keys(bloggerInfo.contactInformation).forEach(key => {
              this.$set(this.bloggerInfo.contactInformation, key, bloggerInfo.contactInformation[key])
            })
          }
        }
      } catch (error) {
        console.error(error)
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
    }
  }
}
</script>
<style scoped>
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
