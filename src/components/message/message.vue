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
    this.$store.commit('setHeadBgUrl', (this.$store.state.app.config.messageHeadBgUrl || this.$store.state.app.config.defaultHeadBgUrl))
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
