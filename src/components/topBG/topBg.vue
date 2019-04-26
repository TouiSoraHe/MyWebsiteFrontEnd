<template>
  <div :class="{showBg1:switchBg && isShowBg,showBg2:!switchBg && isShowBg}" :style="[bgStyleObj]" class="bg">
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowBg: false,
      switchBg: false,
      bgUrl: ''
    }
  },
  computed: {
    headBgUrl() {
      return this.$store.state.app.headBgUrl
    },
    bgStyleObj() {
      const styleObj = {
        height: this.$store.state.app.windowSize.y * 0.6 + 'px'
      }
      styleObj['background-image'] = 'url(' + this.bgUrl + ')'
      return styleObj
    }
  },
  watch: {
    headBgUrl: function() {
      if (this.headBgUrl === '' || this.headBgUrl === undefined || this.headBgUrl === null) {
        this.closeBg()
      } else {
        this.loadBg()
      }
    }
  },
  created() {
    this.loadBg()
  },
  methods: {
    loadBg() {
      const that = this
      that.closeBg()
      var headbg = new Image()
      headbg.src = that.headBgUrl
      if (headbg.complete) {
        that.openBg()
      } else {
        headbg.onload = function() {
          that.openBg()
        }
      }
    },
    closeBg() {
      this.bgUrl = ''
      this.isShowBg = false
    },
    openBg() {
      this.isShowBg = true
      this.switchBg = !this.switchBg
      this.bgUrl = this.headBgUrl
    }
  }
}
</script>
<style scoped>
.bg {
    width: 100%;
    z-index: -1;
    background-size: cover;
    background-position: center 0;
    background-repeat: no-repeat;
    -webkit-mask-image: url('circlemask.png');
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    -webkit-mask-size: 300%;
    background-color: rgba(255, 255, 255, 1);
}

.showBg1 {
    background-color: rgba(255, 255, 255, 0);
    -webkit-animation: circle_zoom1 1s ease-in-out;
}

.showBg2 {
    background-color: rgba(255, 255, 255, 0);
    -webkit-animation: circle_zoom2 1s ease-in-out;
}

@keyframes circle_zoom1 {
    0% {
        opacity: 0;
        -webkit-mask-size: 0%
    }
    20% {
        opacity: .3;
        -webkit-mask-size: 50%
    }
    80% {
        opacity: .7;
        -webkit-mask-size: 250%
    }
    to {
        opacity: 1;
        -webkit-mask-size: 300%
    }
}

@keyframes circle_zoom2 {
    0% {
        opacity: 0;
        -webkit-mask-size: 0%
    }
    20% {
        opacity: .3;
        -webkit-mask-size: 50%
    }
    80% {
        opacity: .7;
        -webkit-mask-size: 250%
    }
    to {
        opacity: 1;
        -webkit-mask-size: 300%
    }
}
</style>
