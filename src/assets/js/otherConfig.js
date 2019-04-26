import hljs from 'highlight.js'
import Vue from 'vue'
import 'highlight.js/styles/monokai-sublime.css'
import md5 from 'js-md5'

Vue.prototype.$highlight = function() {
  const blocks = document.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
}

Vue.prototype.$md5 = md5

Vue.prototype.$getGravatar = function(email) {
  const hash = this.$md5(email.trim().toLowerCase())
  return 'http://www.gravatar.com/avatar/' + hash + '?s=200'
}

Math.randomNum = function(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    default:
      return 0
  }
}

