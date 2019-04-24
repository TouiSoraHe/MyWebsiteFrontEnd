<template>
  <div>index</div>
</template>
<script>
export default {
  created() {
    this.$store.setHeadBgUrl(this.$store.getConfig().indexHeadBgUrl || this.$store.getConfig().defaultHeadBgUrl)
  }
}
</script>
<style scoped>
</style>
