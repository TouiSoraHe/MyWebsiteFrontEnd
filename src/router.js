import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index/index.vue'
import blog from 'components/blog/blog.vue'
import music from 'components/music/music.vue'
import archive from 'components/archive/archive.vue'
import message from 'components/message/message.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path:'/',component:index},
    { path:'/blog',component:blog},
    { path:'/archive',component:archive},
    { path:'/music',component:music},
    { path:'/message',component:message}
  ],
  linkActiveClass: 'active'
})
