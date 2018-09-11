import Vue from 'vue'
import Router from 'vue-router'
import index from 'components/index/index.vue'
import blog from 'components/blog/blog.vue'
import music from 'components/music/music.vue'
import archive from 'components/archive/archive.vue'
import message from 'components/message/message.vue'
import article from 'components/article/article.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    { path:'/',component:index,meta: {title: '首页'}},
    { path:'/blog',component:blog,meta: {title: '博文'}},
    { path:'/archive',component:archive,meta: {title: '归档'}},
    { path:'/music',component:music,meta: {title: '音乐'}},
    { path:'/message',component:message,meta: {title: '留言'}},
    { path:'/blog/:id',component:article,props: true,meta: {title: '博文'}}
  ],
  linkActiveClass: 'active'
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;