// /src/components/MessageBox/index.js

import tipsVue from './tips.vue'
// 定义插件对象
const Tips = {}
// vue的install方法，用于定义vue插件
Tips.install = function(Vue, options) {
  const TipsInstance = Vue.extend(tipsVue)
  let currentTips
  const initInstance = () => {
    // 实例化vue实例
    currentTips = new TipsInstance()
    const tipsEl = currentTips.$mount().$el
    document.body.appendChild(tipsEl)
  }
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$tips = {
    showTips(options) {
      if (!currentTips) {
        initInstance()
      }
      if (typeof options === 'string') {
        currentTips.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentTips, options)
      }
      return currentTips.showTips()
    }
  }
}
export default Tips
