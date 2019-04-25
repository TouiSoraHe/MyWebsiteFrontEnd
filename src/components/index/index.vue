<template>
  <div>index</div>
</template>
<script>
export default {
  created() {
    this.$store.commit('setHeadBgUrl', (this.$store.state.app.config.indexHeadBgUrl || this.$store.state.app.config.defaultHeadBgUrl))
  }
}
</script>
<style scoped>
</style>
