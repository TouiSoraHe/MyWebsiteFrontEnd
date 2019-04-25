<template>
  <div>
    music
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('setHeadBgUrl', (this.$store.state.app.config.musicHeadBgUrl || this.$store.state.app.config.defaultHeadBgUrl))
  }
}
</script>

<style scoped>
</style>
