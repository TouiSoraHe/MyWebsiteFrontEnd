<template>
  <div>
    <comment blogid="-1"></comment>
  </div>
</template>

<script>
import comment from 'components/comment/comment.vue'

export default {
  components: {
    'comment': comment
  },
  created() {
    this.$store.setHeadBgUrl(this.$store.getConfig().messageHeadBgUrl || this.$store.getConfig().defaultHeadBgUrl)
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
