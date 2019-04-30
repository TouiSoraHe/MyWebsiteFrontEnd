<template>
  <aplayer
    ref="aplayer"
    fixed
    :volume="1"
    :audio="$store.state.music.playlist"
    @error="onMusicError"
    @listRemove="onListSwitch"
  ></aplayer>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
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
    },
    onListSwitch() {
      this.$refs.aplayer.switch(0)
    }
  }
}
</script>

<style scoped>
</style>
