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

// 格式化日期
function Utils() {}

Utils.prototype = {
  constructor: Utils,
  FormatTime: function(date, fmt) {
    var o = {
      'y+': date.getFullYear(),
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S+': date.getMilliseconds() // 毫秒
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        if (k === 'y+') {
          fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
        } else if (k === 'S+') {
          var lens = RegExp.$1.length
          lens = lens === 1 ? 3 : lens
          fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
        } else {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
    }
    return fmt
  }
}

Vue.prototype.$utils = new Utils()

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
