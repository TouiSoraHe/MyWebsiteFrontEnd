<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {
      observer: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      const config = {
        rootMargin: '400px 0px 400px 0px',
        threshold: 0
      }
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
          this.$emit('intersect')
        }
      }, config)
      this.observer.observe(this.$el)
    })
  },
  destroyed() {
    this.observer.disconnect()
  }
}
</script>
<style scoped>
</style>
