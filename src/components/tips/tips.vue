<template>
  <v-snackbar
    v-model="snackbar"
    :color="color"
    :timeout="0"
    vertical
    top
  >
    {{ text }}
    <v-btn
      dark
      flat
      @click="snackbar = false"
    >
      关闭
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'info'
    },
    timeout: {
      type: Number,
      default: 3000
    },
    text: {
      type: String,
      default: ''
    },
    switch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeoutID: null
    }
  },
  computed: {
    snackbar: {
      get: function() {
        return this.switch
      },
      set: function(newValue) {
        this.switch = newValue
      }
    }
  },
  methods: {
    showTips() {
      this.switch = true
      if (this.color === 'error') {
        console.error(this.text)
      }
      if (this.timeoutID) {
        clearTimeout(this.timeoutID)
        this.timeoutID = null
      }
      if (this.timeout > 0) {
        this.timeoutID = setTimeout(() => {
          this.switch = false
          this.timeoutID = null
        }, this.timeout)
      }
    }
  }
}
</script>

<style scoped>
</style>
