import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'

Vue.prototype.$highlight = function() {
  const blocks = document.querySelectorAll('pre code')
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
}
